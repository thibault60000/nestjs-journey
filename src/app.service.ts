import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getCats(): string {
    return 'Hello Cats!';
  }
  getCatById(id): string {
    return `Hello Cat by id ${id}!`;
  }
}
