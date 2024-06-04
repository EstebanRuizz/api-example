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

@Injectable()
export class InfrastructureService {
  private role: RoleConfig;
  private entities: EntitiesConfig[] = [];
  private entitiesByRole: EntitiesByRoleConfig[] = [];

  public constructor(
    private readonly entitiesService: EntitiesService,
    private readonly externalDBRoles: ExternalDBRolesService,
    private readonly entitiesByRoleService: EntitiesByRoleService,
  ) {}

  public async createBaseInfrastructure(infrastructureDTO: InfrastructureDTO) {
    await this.createAdminRole(infrastructureDTO);
    await this.syncEndPoints();
    await this.grantPermissionsToAdminRole();

    return {
      role: this.role,
      entities: this.entities,
      entitiesByRole: this.entitiesByRole,
    };
  }

  private async grantPermissionsToAdminRole() {
    const entitiesByRoleDTOs: EntitiesByRoleDTO[] = this.entities.map((e) => ({
      roleFK: this.role.id,
      entityFK: e.id,
    }));

    this.entitiesByRole =
      await this.entitiesByRoleService.bulkCreate(entitiesByRoleDTOs);
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
    return this.role;
  }

  public async findByExpression(expression: WhereOptions): Promise<object[]> {
    return this.entitiesByRoleService.findByExpression(expression);
  }
}
