import {
  Model,
  Index,
  Table,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import { RoleConfig } from './RoleConfig';
import { EntitiesConfig } from './EntitiesConfig';
import { IEntitiesByRole } from 'src/core/domain/models/IEntitiesByRole';

@Table
export class EntitiesByRoleConfig
  extends Model<IEntitiesByRole>
  implements IEntitiesByRole
{
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => RoleConfig)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roleFK: string;

  @ForeignKey(() => EntitiesConfig)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  entityFK: string;
}
