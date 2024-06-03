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
import { IEntities } from 'src/core/domain/models/IEntities';

@Table
export class EntitiesConfig extends Model<EntitiesConfig> implements IEntities {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ primaryKey: true, type: DataType.UUIDV4 })
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
