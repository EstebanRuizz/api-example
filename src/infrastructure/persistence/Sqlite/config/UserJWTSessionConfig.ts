import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUserJWTSession } from 'src/core/domain/models/IUserJWTSession';

@Table
export class UserJWTSessionConfig
  extends Model<UserJWTSessionConfig>
  implements IUserJWTSession
{
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  jwtSessionId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roleFK: string;
}
