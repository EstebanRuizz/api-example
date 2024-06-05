import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IRole } from 'src/core/domain/models/IRole';

@Table
export class LocalRole extends Model<LocalRole> implements IRole {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  description: string;
}
