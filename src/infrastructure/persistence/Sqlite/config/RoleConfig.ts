import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IRole } from 'src/core/domain/models/IRole';

@Table
export class RoleConfig extends Model<RoleConfig> implements IRole {
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
