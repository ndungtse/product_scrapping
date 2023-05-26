import { Controller, Get, Param } from '@nestjs/common';
import { AmazonService } from './amazon.service';
import { ApiTags, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { ApiResponse, responses } from 'src/utils/ApiResponse';
import { Product } from 'src/models/Product';

@ApiTags('Amazon')
@Controller('products/amazon')
export class AmazonController {
  constructor(private readonly amazonService: AmazonService) {}

  @Get('search/:keyword')
  @SwaggerResponse({ type: ApiResponse<Product> })
  @SwaggerResponse(responses.fetched)
  async search(@Param('keyword') keyword: string) {
    const data = await this.amazonService.search(keyword);
    return new ApiResponse(data.message, data.data, data.success);
  }

  @Get('product/:id')
  @SwaggerResponse({ type: ApiResponse<Product> })
  @SwaggerResponse(responses.fetched)
  async getProduct(@Param('id') id: string) {
    const data = await this.amazonService.getProductDetails(id);
    return new ApiResponse(data.message, data.data, data.success);
  }
}
