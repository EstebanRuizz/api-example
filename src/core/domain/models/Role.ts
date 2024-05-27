import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Role extends Model<Role> {
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
  description: string;
}
