import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { ApiResponse, responses } from 'src/utils/ApiResponse';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @SwaggerResponse({ type: ApiResponse })
  @SwaggerResponse(responses.fetched)
  async getGlobalDeals() {
    const data = await this.productsService.getGlobalDeals();
    return new ApiResponse(data.message, data.data, data.success);
  }

  @Get(':category')
  @SwaggerResponse({ type: ApiResponse })
  async getGlobalDealsByCategory(@Param('category') category: string) {
    const data = await this.productsService.getGlobalDeals(category);
    return new ApiResponse(data.message, data.data, data.success);
  }
}
