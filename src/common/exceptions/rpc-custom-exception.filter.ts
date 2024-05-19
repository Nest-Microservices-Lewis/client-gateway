import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const rpxError = exception.getError();

    if (rpxError.toString().includes('Empty response')) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: rpxError
          .toString()
          .substring(0, rpxError.toString().indexOf('(') - 1),
      });
    }
    if (
      typeof rpxError === 'object' &&
      'status' in rpxError &&
      'message' in rpxError
    ) {
      const status = isNaN(+rpxError.status) ? 400 : rpxError.status;
      return response.status(status).json(rpxError);
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: rpxError,
    });
  }
}
