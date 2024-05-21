import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../domain/models/User';
import { UserDTO } from '../../DTO/UserDTO';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await user.destroy();
    }
  }

  public async create(userDTO: UserDTO): Promise<User> {
    const user: User = this.userModel.build({
      name: userDTO.name,
      email: userDTO.email,
    });
    return user.save();
  }
}
