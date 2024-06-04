import { IUserJWTSession } from 'src/core/domain/models/IUserJWTSession';
import { Model, Index, Table, Column, DataType } from 'sequelize-typescript';

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
