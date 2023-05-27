import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { ProductsController } from './products.controller';
import { EbayModule } from './ebay/ebay.module';
import { AmazonModule } from './amazon/amazon.module';

@Module({
  // controllers: [ProductsController],
  imports: [AmazonModule, EbayModule],
  providers: [ProductsService],
})
export class ProductsModule {}
