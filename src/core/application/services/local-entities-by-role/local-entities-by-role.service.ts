import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LocalEntitiesByRole } from 'src/infrastructure/persistence/Sqlite/config/LocalEntitiesByRole';
import { EntitiesByRoleDTO } from '../../DTO/EntitiesByRole';
import { PaginationDTO } from '../../DTO/inner/PaginationDTO';
import { EnumDatabase } from '../../enums/EnumDatabase';

@Injectable()
export class LocalEntitiesByRoleService {
  // private currentEntitiesByRole: EntitiesByRoleDTO;
  // private listEntitiesByRole: EntitiesByRoleDTO[] = [];

  // constructor(
  //   @InjectModel(LocalEntitiesByRole, EnumDatabase.sqliteConnection)
  //   private readonly entitiesByRole: typeof LocalEntitiesByRole,
  // ) {}

  // public async findAll(): Promise<LocalEntitiesByRole[]> {
  //   return await this.entitiesByRole.findAll();
  // }

  // public async findPaginated(
  //   pagination: PaginationDTO,
  // ): Promise<LocalEntitiesByRole[]> {
  //   const { page, pageSize } = pagination;
  //   const offset = (page - 1) * pageSize;
  //   const limit = pageSize;

  //   return await this.entitiesByRole.findAll({
  //     limit,
  //     offset,
  //   });
  // }

  // public async findById(id: string): Promise<LocalEntitiesByRole> {
  //   return await this.entitiesByRole.findByPk(id);
  // }
  // public async update(
  //   id: string,
  //   tUpdateDTO: EntitiesByRoleDTO,
  // ): Promise<LocalEntitiesByRole> {
  //   const entitiesByRoleConfig: LocalEntitiesByRole =
  //     await this.entitiesByRole.findByPk(id);
  //   if (entitiesByRoleConfig) {
  //     await this.entitiesByRole.update(tUpdateDTO, {
  //       where: { id },
  //     });
  //     return this.entitiesByRole.findByPk(id);
  //   }
  // }

  // public async delete(id: string): Promise<LocalEntitiesByRole> {
  //   const entitiesByRoleConfig: LocalEntitiesByRole =
  //     await this.entitiesByRole.findByPk(id);
  //   if (entitiesByRoleConfig) {
  //     await this.entitiesByRole.destroy({
  //       where: { id },
  //     });
  //     return entitiesByRoleConfig;
  //   }
  // }

  // public async create(
  //   tCreateDTO: EntitiesByRoleDTO,
  // ): Promise<LocalEntitiesByRole> {
  //   const entitiesByRoleConfig: LocalEntitiesByRole = this.entitiesByRole.build(
  //     {
  //       entityFK: tCreateDTO.entityFK,
  //       roleFK: tCreateDTO.roleFK,
  //     },
  //   );
  //   return await entitiesByRoleConfig.save();
  // }

  // public async bulkCreate(
  //   entitiesByRole: EntitiesByRoleDTO[],
  // ): Promise<LocalEntitiesByRole[]> {
  //   this.listEntitiesByRole = entitiesByRole.map((e: EntitiesByRoleDTO) => ({
  //     entityFK: e.entityFK,
  //     roleFK: e.roleFK,
  //   }));

  //   if (await this.alreadyExits()) {
      
  //   }

  //   return this.entitiesByRole.bulkCreate(this.listEntitiesByRole);
  // }

  // private async alreadyExits(): Promise<boolean> {
  //   const exitingEndPoint = await this.entitiesByRole.findOne({
  //     where: {
  //       concatenatedEndPoint: this.currentEntitiesByRole,
  //     },
  //   });

  //   return !!exitingEndPoint;
  // }
}
