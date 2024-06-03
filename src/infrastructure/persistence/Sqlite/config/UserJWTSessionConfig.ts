import { IUserJWTSession } from 'src/core/domain/models/IUserJWTSession';
import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class UserJWTSessionConfig
  extends Model<UserJWTSessionConfig>
  implements IUserJWTSession
{
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  jwtSessionId: string;

  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataTypes.UUID,
    allowNull: false,
  })
  roleFK: string;
}
