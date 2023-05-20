import { Injectable } from '@nestjs/common';
import { ApiResponse } from './utils/ApiResponse';

@Injectable()
export class AppService {
  getHello(): ApiResponse {
    return new ApiResponse(
      'Hello! Welcome to product scrapping apis',
      null,
      true,
    );
  }
}
