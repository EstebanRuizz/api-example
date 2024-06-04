import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserConfig } from '../../../../infrastructure/persistence/Sqlite/config/UserConfig';
import { UserDTO } from '../../DTO/UserDTO';
import { EnumDatabase } from '../../enums/EnumDatabase';
import { Sequelize, WhereOptions } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserConfig, EnumDatabase.mssqlConnection)
    private readonly userModel: typeof UserConfig,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) {}

  findAll(): Promise<UserConfig[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<UserConfig> {
    return this.userModel.findByPk(id);
  }

  public async findByEmail(email: string): Promise<UserConfig | null> {
    return this.userModel.findOne({ where: { email } });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await user.destroy();
    }
  }

  public async create(userDTO: UserDTO): Promise<UserConfig | null> {
    const transaction = await this.sequelize.transaction();
    try {
      if (await this.tryGetUser(userDTO, transaction)) {
        await transaction.rollback();
        return null;
      }
      const createdUser = await this.createNewUser(userDTO, transaction);

      await transaction.commit();

      return createdUser;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async createNewUser(userDTO: UserDTO, transaction) {
    const user: UserConfig = this.userModel.build({
      name: userDTO.name ?? userDTO.email.split('@').shift(),
      email: userDTO.email,
      password: userDTO.password,
      roleFK: userDTO.roleFK,
    });

    const createdUser = await user.save({ transaction });
    return createdUser;
  }

  private async tryGetUser(userDTO: UserDTO, transaction) {
    return await this.userModel.findOne({
      where: { email: userDTO.email },
      transaction,
    });
  }

  public async findByExpression(where: WhereOptions): Promise<UserConfig[]> {
    return this.userModel.findAll({ where });
  }
}
