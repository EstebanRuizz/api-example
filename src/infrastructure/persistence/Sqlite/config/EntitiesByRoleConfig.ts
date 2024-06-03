import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { RoleConfig } from './RoleConfig';
import { EntitiesConfig } from './EntitiesConfig';
import { IEntitiesByRole } from 'src/core/domain/models/IEntitiesByRole';

@Table
export class EntitiesByRoleConfig
  extends Model<IEntitiesByRole>
  implements IEntitiesByRole
{
  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUID,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => RoleConfig)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  roleFK: string;

  @ForeignKey(() => EntitiesConfig)
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  entityFK: string;
}
