import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
  ) {}

  @Get(':id')
  getHello(@Param() id: number, @Query('version') version: string): object {
    return {
      id,
      version,
      message: this.appService.getHello(),
    };
  }

  @Post(':id')
  public post(
    @Body() data: object,
    @Param() id: number,
    @Query('version') version: string,
  ): object {
    return {
      id,
      version,
      data,
      product: this.productService.getProduct(),
    };
  }
}
