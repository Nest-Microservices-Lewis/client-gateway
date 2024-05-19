import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TransportsModule } from '@/transports';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [TransportsModule],
})
export class ProductsModule {}
