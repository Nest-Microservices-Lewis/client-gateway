import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE } from '@/config';
import { ClientProxy } from '@nestjs/microservices';
import { throwsException } from '@/common';
import { ChangeOrderStatusDto, OrderPaginationDto } from './dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.client.send('createOrder', createOrderDto),
    ).catch(throwsException());
  }

  @Get()
  findAll(@Query() query: OrderPaginationDto) {
    return this.client.send('findAllOrders', query).pipe(throwsException());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneOrder', { id }).pipe(throwsException());
  }

  @Patch(':id/status')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto,
  ) {
    return this.client
      .send('changeOrderStatus', {
        id,
        ...changeOrderStatusDto,
      })
      .pipe(throwsException());
  }
}
