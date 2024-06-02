import { Table, Column, Model, Index } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IEntities } from 'src/core/domain/models/IEntities';

@Table
export class EntitiesConfig extends Model<EntitiesConfig> implements IEntities {
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  entityName: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  entityRoute: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  entityMethod: string;

  @Index({ unique: true })
  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  concatenatedEndPoint: string;
}
