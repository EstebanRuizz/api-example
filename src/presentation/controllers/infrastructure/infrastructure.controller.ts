import { Body, Controller, Get, Post } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { InfrastructureDTO } from 'src/core/application/DTO/http/infrastructureDTO';
import { IGeneralInfrastructure } from 'src/core/application/interface/IGeneralInfrastructure';
import { InfrastructureService } from 'src/core/application/services/infrastructure/infrastructure.service';

@Controller('infrastructure')
export class InfrastructureController implements IGeneralInfrastructure {
  constructor(private readonly infrastructure: InfrastructureService) {}

  @Get('health')
  public async getHealth(): Promise<object[]> {
    throw new Error('Method not implemented.');
  }

  @Post('api-config')
  public async postApiConfig(
    @Body() infrastructureDTO: InfrastructureDTO,
  ): Promise<object> {
    return await this.infrastructure.createBaseInfrastructure(
      infrastructureDTO,
    );
  }

  @Post('findByExpression')
  public async findByExpression(
    @Body() infrastructureDTO: object,
  ): Promise<object> {
    return await this.infrastructure.findByExpression(
      infrastructureDTO as WhereOptions,
    );
  }
}
