import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { ApiResponse, responses } from 'src/utils/ApiResponse';
import { categories } from 'src/utils/shared';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('globaldeals')
  @SwaggerResponse({ type: ApiResponse })
  @SwaggerResponse(responses.fetched)
  async getGlobalDeals() {
    const data = await this.productsService.getGlobalDeals();
    return new ApiResponse(data.message, data.data, data.success);
  }

  @Get('globaldeals/:category')
  @SwaggerResponse({ type: ApiResponse })
  async getGlobalDealsByCategory(@Param('category') category: string) {
    const data = await this.productsService.getGlobalDeals(category);
    return new ApiResponse(data.message, data.data, data.success);
  }

  @Get('categories')
  @SwaggerResponse({ type: ApiResponse })
  async scrapeCategories() {
    const data = categories;
    return new ApiResponse('Categories', data, true);
  }

  @Get('subcategories/:category')
  @SwaggerResponse({ type: ApiResponse })
  async scrapeSubCategories(@Param('category') category: string) {
    const data = await this.productsService.scrapeSubCategories(category);
    return new ApiResponse(data.message, data.data, data.success);
  }
}
