import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('🐈 Request Middleware...');
    next();
  }
}

// * Functionnal Middleware
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('🐈 Request Functionnal Middleware ...');
  next();
}
