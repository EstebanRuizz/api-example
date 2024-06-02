import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { RoleConfig } from './RoleConfig';
import { IUser } from 'src/core/domain/models/IUser';

@Table
export class UserConfig extends Model<UserConfig> implements IUser {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
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
    type: DataTypes.UUIDV4,
    allowNull: false,
  })
  roleFK: string;

  @Column({
    type: DataTypes.UUIDV4,
    allowNull: true,
  })
  jwtSessionId: string;
}
