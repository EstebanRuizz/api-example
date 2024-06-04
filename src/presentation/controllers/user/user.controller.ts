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
import { UserConfig } from '../../../infrastructure/persistence/Sqlite/config/UserConfig';
import { AuthGuard } from 'src/presentation/guards/auth/auth.guard';
import { HttpRoutesService } from 'src/core/application/services/http-routes/http-routes.service';
import { EntitiesService } from 'src/core/application/services/entities/entities.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpRoutes: HttpRoutesService,
    private readonly entitiesService: EntitiesService,
  ) {}

  @Get('httpRoutes')
  public async getHttpRoutes(): Promise<object> {
    await this.entitiesService.syncHttpRoutes();
    return this.httpRoutes.getRoutes();
  }

  @UseGuards(AuthGuard)
  @Get()
  public async findAll(): Promise<UserConfig[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserConfig> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userDTO: UserDTO): Promise<UserConfig> {
    return this.userService.create(userDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
