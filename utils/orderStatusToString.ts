import { OrderStatus } from '../enums/OrderStatus';

export function orderStatusToString(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.canceled: return 'Закрыт';
    case OrderStatus.inProgress: return 'Доставляется';
    case OrderStatus.completed: return 'Доставлен';
    case OrderStatus.registration: return 'Подтверждение';
  }

  return null;
}