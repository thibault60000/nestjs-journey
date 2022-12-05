import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('request', request);

    return validateRequest(request);
  }
}
function validateRequest(request) {
  console.log('validateRequest', request);

  // do something
  return true;

  // if it returns true, the request will be processed.
  // if it returns false, Nest will deny the request.
}
