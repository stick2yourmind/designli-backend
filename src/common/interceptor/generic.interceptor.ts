import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GenericInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        const jsonError = JSON.parse(JSON.stringify(error));
        const errorMessage = jsonError?.response?.message;
        const errorResponse = jsonError?.response?.error;
        if (errorMessage && errorResponse) {
          throw new BadRequestException(errorMessage, errorResponse);
        }
        throw new BadRequestException();
      }),
    );
  }
}
