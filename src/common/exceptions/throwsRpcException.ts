import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

export function throwsException() {
  return catchError((err) => {
    throw new RpcException(err);
  });
}
