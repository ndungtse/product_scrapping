import { Controller, Get, Param } from '@nestjs/common';
import { EbayService } from './ebay.service';
import { ApiTags, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { ApiResponse, responses } from 'src/utils/ApiResponse';
import { categories } from 'src/utils/shared';
import { Product } from 'src/models/Product';

@ApiTags('Ebay')
@Controller('products/ebay')
export class EbayController {
  constructor(private readonly ebayService: EbayService) {}

  @Get('globaldeals')
  @SwaggerResponse({ type: ApiResponse<Product> })
  @SwaggerResponse(responses.fetched)
  async getGlobalDeals() {
    const data = await this.ebayService.getGlobalDeals();
    return new ApiResponse(data.message, data.data, data.success);
  }

  @Get('globaldeals/:category')
  @SwaggerResponse({ type: ApiResponse })
  async getGlobalDealsByCategory(@Param('category') category: string) {
    const data = await this.ebayService.getGlobalDeals(category);
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
    const data = await this.ebayService.scrapeSubCategories(category);
    return new ApiResponse(data.message, data.data, data.success);
  }

  @Get('products/itm/:id')
  @SwaggerResponse({ type: ApiResponse })
  async scrapeProduct(@Param('id') id: string) {
    const data = await this.ebayService.getProductDetails(id);
    return new ApiResponse(data.message, data.data, data.success);
  }
}
