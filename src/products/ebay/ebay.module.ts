import { Module } from '@nestjs/common';
import { EbayService } from './ebay.service';
import { EbayController } from './ebay.controller';

@Module({
  controllers: [EbayController],
  providers: [EbayService],
})
export class EbayModule {}
