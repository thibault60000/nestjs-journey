import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    { name: 'Garfield', age: 3, breed: 'Orange Tabby' },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAllCat(): Cat[] {
    return this.cats;
  }
}
