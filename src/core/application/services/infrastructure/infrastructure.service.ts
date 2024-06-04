import { Injectable } from '@nestjs/common';
import { EntitiesConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesConfig';
import { RoleConfig } from 'src/infrastructure/persistence/Sqlite/config/RoleConfig';
import { InfrastructureDTO } from '../../DTO/http/infrastructureDTO';
import { RoleDTO } from '../../DTO/RoleDTO';
import { EntitiesService } from '../entities/entities.service';
import { ExternalDBRolesService } from '../roles/external-db-roles.service';
import { EntitiesByRoleDTO } from '../../DTO/EntitiesByRole';
import { EntitiesByRoleService } from '../entities-by-role/entities-by-role.service';
import { EntitiesByRoleConfig } from 'src/infrastructure/persistence/Sqlite/config/EntitiesByRoleConfig';
import { WhereOptions } from 'sequelize';
import { UserService } from '../user/user.service';
import { UserDTO } from '../../DTO/UserDTO';
import { UserConfig } from 'src/infrastructure/persistence/Sqlite/config/UserConfig';

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
  ) {}

  public async createBaseInfrastructure(infrastructureDTO: InfrastructureDTO) {
    await this.createAdminRole(infrastructureDTO);
    await this.createUser(infrastructureDTO);
    await this.syncEndPoints();
    await this.grantPermissionsToAdminRole();

    return {
      user: this.user,
      role: this.role,
      entities: this.entities,
      entitiesByRole: this.entitiesByRole,
    };
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

  private async syncEndPoints() {
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
