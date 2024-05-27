import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserDTO } from '../../../core/application/DTO/UserDTO';
import { UserService } from '../../../core/application/services/user/user.service';
import { User } from '../../../core/domain/models/User';
import { AuthGuard } from 'src/presentation/guards/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userDTO: UserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
