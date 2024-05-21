import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  public getProduct(): object {
    return {
      productName: 'laptop',
      price: 1200,
    };
  }
}
