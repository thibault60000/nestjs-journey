import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [DogsModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // Logger Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
