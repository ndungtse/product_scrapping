import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  specs?: any;
  about?: any;
  altImageSrcs?: any;
  description?: any;
  images?: any;
  rating?: any;
  reviews?: any;
  seller?: any;
  shipping?: any;
  url?: any;
}
