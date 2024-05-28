import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserConfig } from '../../../../infrastructure/persistence/Sqlite/config/UserConfig';
import { UserDTO } from '../../DTO/UserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserConfig)
    private userModel: typeof UserConfig,
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

  public async create(userDTO: UserDTO): Promise<UserConfig> {
    const user: UserConfig = this.userModel.build({
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
      roleFK: userDTO.roleFK,
    });
    return user.save();
  }
}
