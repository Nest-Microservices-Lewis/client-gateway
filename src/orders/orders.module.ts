import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TransportsModule } from '@/transports';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [TransportsModule],
})
export class OrdersModule {}
