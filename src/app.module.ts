import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';

import {
  LoggerMiddleware,
  logger,
} from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [DogsModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Logger Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');

    // * Apply only for a custom Module and RequestMethod
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });

    // * Apply only for a custom Module with pattern
    // ? Match with abcd, ab_cd, abecd ... etc
    // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });

    // * Apply only for a controller
    //  .forRoutes(CatsController);

    // * Excluse specific routes and specific ResuestMethod
    // .exclude(
    //   { path: 'cats', method: RequestMethod.GET },
    //   { path: 'cats', method: RequestMethod.POST },
    //   'cats/(.*)',  -> exclude with pattern
    // )
    // .forRoutes(CatsController);

    // * Functionnal Middleware
    // ? To use when middleware doesn't need any dependencies
    consumer.apply(logger).forRoutes(CatsController);

    // * To Use Multiple Middleware (use comma)
    // consumer.apply(
    //    cors(),
    //    helmet(),
    //    logger
    // )
    // .forRoutes(CatsController);
  }
}
