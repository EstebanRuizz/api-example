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
import { IUser } from 'src/core/domain/models/IUser';

@Table
export class UserConfig extends Model<UserConfig> implements IUser {
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
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @ForeignKey(() => RoleConfig)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roleFK: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  jwtSessionId: string;
}
