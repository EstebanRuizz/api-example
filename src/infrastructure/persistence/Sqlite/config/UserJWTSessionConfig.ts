import { IUserJWTSession } from 'src/core/domain/models/IUserJWTSession';
import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class UserJWTSessionConfig
  extends Model<UserJWTSessionConfig>
  implements IUserJWTSession
{
  @Column({
    type: DataTypes.UUIDV4,
    allowNull: false,
  })
  jwtSessionId: string;

  @Column({
    type: DataTypes.UUIDV4,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataTypes.UUIDV4,
    allowNull: false,
  })
  roleFK: string;
}
