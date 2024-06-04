import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IEntitiesByRole } from 'src/core/domain/models/IEntitiesByRole';
import { EntitiesConfig } from './EntitiesConfig';
import { RoleConfig } from './RoleConfig';

@Table
export class EntitiesByRoleConfig
  extends Model<IEntitiesByRole>
  implements IEntitiesByRole
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
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
