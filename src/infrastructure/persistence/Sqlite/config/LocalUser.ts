import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IUser } from 'src/core/domain/models/IUser';
import { LocalRole } from './LocalRole';

@Table
export class LocalUser extends Model<LocalUser> implements IUser {
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

  @ForeignKey(() => LocalRole)
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
