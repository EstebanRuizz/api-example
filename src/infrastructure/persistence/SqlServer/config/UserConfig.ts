import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IUser } from 'src/core/domain/models/IUser';
import { RoleConfig } from './RoleConfig';

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
