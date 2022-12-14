import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { RolesGuard } from './../common/guard/role.guard';
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
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Res,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import { Response } from 'express';

import { Observable, of } from 'rxjs';

import { schema } from './schema/cat-schema';
import { JoiValidationPipe } from 'src/validation/validation-joi.pipe';
import { ClassValidatorValidationPipe } from 'src/validation/validation-class.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

// @Controller({ host: 'admin.example.com' }) -> sub domain routing
@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(TransformInterceptor) // Or use decorator before specific method
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
  async createCat(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get('all')
  async findAllCats(): Promise<Cat[]> {
    return this.catsService.findAllCat();
  }

  // -- Use Pipes --

  // Control 'GET localhost:3000/abc'

  // ? {
  //     "statusCode":400,
  //     "message":"Validation failed (numeric string is expected)",
  //     "error":"Bad Request"
  //   }
  @Get('/pipe/:id')
  async catPipebyId(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.getCatById(id);
  }

  // Control 'GET localhost:3000/abc' with Injection

  // ? {
  //    "statusCode":406,
  //    "message":"Validation failed (numeric string is expected)",
  //    "error":"Not Acceptable"
  // }
  @Get('/pipe/injection/:id')
  async catPipeByIdInjection(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.getCatById(id);
  }

  // Control with Pipes and Joi
  @Post()
  @UsePipes(new JoiValidationPipe(schema))
  async createWithJoi(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // Use Class Validator Validation Pipe
  @Post()
  async createWithClassValidator(
    @Body(new ClassValidatorValidationPipe()) createCatDto: CreateCatDto,
  ) {
    this.catsService.create(createCatDto);
  }

  // Use Pipe to transform String to Int
  @Get('/parseint/:id')
  async CatByParsingStringtoInt(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.getCatById(id);
  }

  // Use Guard and Metadata for Roles
  @Post()
  @Roles('admin')
  @SetMetadata('roles', ['admin'])
  async createWithRolesGuard(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
