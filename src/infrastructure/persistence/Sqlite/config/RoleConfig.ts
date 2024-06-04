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
import { IRole } from 'src/core/domain/models/IRole';

@Table
export class RoleConfig extends Model<RoleConfig> implements IRole {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  description: string;
}
