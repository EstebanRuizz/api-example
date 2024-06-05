import { Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { EntitiesByRoleConfig } from 'src/infrastructure/persistence/SqlServer/config/EntitiesByRoleConfig';
import { EntitiesConfig } from 'src/infrastructure/persistence/SqlServer/config/EntitiesConfig';
import { RoleConfig } from 'src/infrastructure/persistence/SqlServer/config/RoleConfig';
import { UserConfig } from 'src/infrastructure/persistence/SqlServer/config/UserConfig';
import { EntitiesByRoleDTO } from '../../DTO/EntitiesByRole';
import { InfrastructureDTO } from '../../DTO/http/infrastructureDTO';
import { RoleDTO } from '../../DTO/RoleDTO';
import { UserDTO } from '../../DTO/UserDTO';
import { EntitiesByRoleService } from '../entities-by-role/entities-by-role.service';
import { EntitiesService } from '../entities/entities.service';
import { LocalEntitiesByRoleService } from '../localDatabase/local-entities-by-role/local-entities-by-role.service';
import { LocalEntitiesService } from '../localDatabase/local-entities/local-entities.service';
import { LocalRoleService } from '../localDatabase/local-role/local-role.service';
import { ExternalDBRolesService } from '../roles/external-db-roles.service';
import { UserService } from '../user/user.service';

@Injectable()
export class InfrastructureService {
  private role: RoleConfig;
  private user: UserConfig;
  private entities: EntitiesConfig[] = [];
  private entitiesByRole: EntitiesByRoleConfig[] = [];

  public constructor(
    private readonly userService: UserService,
    private readonly entitiesService: EntitiesService,
    private readonly externalDBRoles: ExternalDBRolesService,
    private readonly entitiesByRoleService: EntitiesByRoleService,
    private readonly localRoleService: LocalRoleService,
    private readonly localEntitiesService: LocalEntitiesService,
    private readonly localEntitiesByRoleService: LocalEntitiesByRoleService,
  ) {}

  public async createBaseInfrastructure(infrastructureDTO: InfrastructureDTO) {
    try {
      await this.createAdminRole(infrastructureDTO);
      await this.createUser(infrastructureDTO);
      await this.createBaseEndPoints();
      await this.grantPermissionsToAdminRole();

      await this.syncLocalRole();
      await this.syncLocalEntities();
      await this.syncLocalEntitiesByRole();
      return {
        role: this.role,
        user: this.user,
        entities: this.entities,
        entitiesByRole: this.entitiesByRole,
      };
    } catch (error) {
      console.log(error);
      return {
        error: 'something wrong happened when loading api-config',
      };
    }
  }

  private async syncLocalRole(): Promise<void> {
    await this.localRoleService.create(this.role);
  }

  private async syncLocalEntities(): Promise<void> {
    await this.localEntitiesService.bulkCreate(this.entities);
  }

  private async syncLocalEntitiesByRole(): Promise<void> {
    await this.localEntitiesByRoleService.bulkCreate(this.entitiesByRole);
  }

  private async createUser(infrastructureDTO: InfrastructureDTO) {
    const user: UserConfig[] = await this.userService.findByExpression({
      email: infrastructureDTO.userEmail,
    });
    if (!user.length) {
      const userDTO: UserDTO = {
        name: infrastructureDTO.userEmail,
        email: infrastructureDTO.userEmail,
        password: infrastructureDTO.userPassword,
        roleFK: this.role.id,
      };
      this.user = await this.userService.create(userDTO);
    } else {
      this.user = user.shift();
    }
  }

  private async grantPermissionsToAdminRole() {
    const entitiesByRoleDTOs: EntitiesByRoleDTO[] = this.entities.map((e) => ({
      roleFK: this.role.id,
      entityFK: e.id,
    }));

    for (const entityRole of entitiesByRoleDTOs) {
      const expression: WhereOptions = {
        roleFK: entityRole.roleFK,
        entityFK: entityRole.entityFK,
      };
      const existingEntries =
        await this.entitiesByRoleService.findByExpression(expression);

      if (existingEntries.length === 0) {
        await this.entitiesByRoleService.create(entityRole);
      }
    }

    this.entitiesByRole = await this.entitiesByRoleService.getAll();
  }

  private async createBaseEndPoints() {
    this.entities = await this.entitiesService.syncHttpRoutes();
  }

  private async createAdminRole(infrastructureDTO: InfrastructureDTO) {
    this.role = await this.externalDBRoles.findBy({
      name: infrastructureDTO.roleName,
    });

    if (!this.role) {
      this.role = await this.externalDBRoles.create(
        new RoleDTO(
          infrastructureDTO.roleName,
          infrastructureDTO.roleDescription,
        ),
      );
    }
  }

  public async findByExpression(expression: WhereOptions): Promise<object[]> {
    return this.entitiesByRoleService.findByExpression(expression);
  }
}
