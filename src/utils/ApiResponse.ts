import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/models/Product';

export class ApiResponse<T = any> {
  @ApiProperty()
  public message: string;
  @ApiProperty({
    type: Product,
    isArray: true,
    // items:
  })
  public data: T = null;
  @ApiProperty()
  public success?: boolean;
  constructor(message: string, data: T, success?: boolean) {
    this.message = message;
    this.success = success;
    this.data = data;
  }
}

export const responses = {
  notfound: {
    status: 404,
    description: 'A post with given id does not exist.',
  },
  fetched: {
    status: 200,
    description: 'Data has been successfully fetched',
  },
};
