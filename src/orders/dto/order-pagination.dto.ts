import { PaginationDto } from '@/common';
import { OrderStatus, OrderStatusList } from '@/orders/enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: (args) =>
      `#${args.value} is not a valid order status. Possible values: ${OrderStatusList.join(
        ', ',
      )}`,
  })
  status?: OrderStatus;
}
