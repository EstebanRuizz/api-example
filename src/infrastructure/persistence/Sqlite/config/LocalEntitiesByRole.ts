import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IEntitiesByRole } from 'src/core/domain/models/IEntitiesByRole';

import { LocalEntities } from './LocalEntities';
import { LocalRole } from './LocalRole';

@Table
export class LocalEntitiesByRole
  extends Model<IEntitiesByRole>
  implements IEntitiesByRole
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @ForeignKey(() => LocalRole)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roleFK: string;

  @ForeignKey(() => LocalEntities)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  entityFK: string;
}
