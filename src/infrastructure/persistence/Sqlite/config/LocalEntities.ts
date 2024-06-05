import {
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { IEntities } from 'src/core/domain/models/IEntities';

@Table
export class LocalEntities extends Model<LocalEntities> implements IEntities {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  @Index({ name: 'PK__EntitiesConfig__3213E83FA17DC417', unique: true })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  entityName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  entityRoute: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  entityMethod: string;

  @Index({ unique: true })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  concatenatedEndPoint: string;
}
