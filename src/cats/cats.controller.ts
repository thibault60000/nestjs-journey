import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat-dto';
import { UpdateCatDto } from './dto/update-cat-dto';
import { Cat } from './interfaces/cat.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HostParam,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { Observable, of } from 'rxjs';

import { AppService } from '../app.service';

// @Controller({ host: 'admin.example.com' }) -> sub domain routing
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  // Simple Get
  @Get()
  getCats(): string {
    Logger.log('Get Cats 🐈');

    try {
      return this.catsService.getCats();
    } catch (error) {
      Logger.error(`Prout 💩 : ${error}`);
      throw error;
    }
  }

  // Get by ID
  @Get('cat/:id')
  getCatById(@Param('id') id: string): string {
    Logger.log(`Get Cat By ID (${id}) 🐈`);
    if (!id) throw new NotFoundException(`Cat with id ${id} not found`);
    try {
      return this.catsService.getCatById(id);
    } catch (error) {
      Logger.error(`Prout 💩 : ${error}`);
      throw error;
    }
  }

  // Custom HTTP Code
  @Post('httpcode')
  @HttpCode(204)
  catHttpCode() {
    return 'This action adds a new cat with 204 http code';
  }

  // Custom Header
  @Post('header')
  @Header('Cache-Control', 'none')
  catHeader() {
    return 'This action adds a new cat with header';
  }

  // Force redirection
  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  catRedirect() {
    return 'This cat is redirected';
  }

  // Redirect and return URL
  // http://localhost:3000/redirect/url?version=5
  @Get('redirect/url')
  @Redirect('https://docs.nestjs.com', 302)
  catRedirectWithUrl(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // HostParam with 'host' domain routing controller
  @Get('hostdomain')
  catHostDomain(@HostParam('account') account: string) {
    return account;
  }

  // Asynchrone function
  @Get('asynchronous')
  async catAsynchronous(): Promise<any[]> {
    return [{ id: 1, name: 'Cat' }];
  }

  // RxJS Observable
  @Get('observable')
  catObservable(): Observable<any[]> {
    return of([{ id: 1, name: 'Cat' }]);
  }

  // Create Cat
  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  // Update Cat
  @Put('cat/:id')
  updateCat(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `Update #${id} cat`;
  }

  // Delete Cat
  @Delete('cat/:id')
  removeCat(@Param('id') id: string) {
    return `Delete #${id} cat`;
  }

  // Return 403 Forbidden
  // {
  // "statusCode": 403,
  // "message": "Forbidden"
  // }
  @Get('forbidden')
  async getForbidden() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  // Return Forbiden Extended
  //   {
  //     "status": 403,
  //     "error": "This is a custom message"
  //   }
  @Get('forbidden/extended')
  async getForbiddenExtended() {
    try {
      // await this.service.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  // Get with custom Response
  @Get('custom/response')
  findGatsWithCustomResponse(@Res() res: Response) {
    res.status(HttpStatus.OK).json([{ id: 1, name: 'Cat' }]);
  }

  // Create with custom Response
  @Post('custom/response')
  createCatWithCustomResponse(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  // -- Begin using CatsService --

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('all')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAllCat();
  }
}
