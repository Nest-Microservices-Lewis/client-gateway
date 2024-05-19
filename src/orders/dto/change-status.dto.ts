import { OrderStatus, OrderStatusList } from '@/orders/enum';
import { IsEnum } from 'class-validator';

export class ChangeOrderStatusDto {
  @IsEnum(OrderStatusList, {
    message: (args) =>
      `#${args.value} is not a valid order status. Possible values: ${OrderStatusList.join(
        ', ',
      )}`,
  })
  status: OrderStatus;
}
