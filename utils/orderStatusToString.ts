import { OrderStatus } from '../enums/OrderStatus';

export function orderStatusToString(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.CANCELED: return 'Закрыт';
    case OrderStatus.DELIVERING: return 'Доставляется';
    case OrderStatus.COMPLETED: return 'Доставлен';
    case OrderStatus.REGISTRATION: return 'В обработке';
  }

  return null;
}