import { Order } from '../interfaces/Order';
import { OrderStatus } from '../enums/OrderStatus';

export function sortOrders(orders: Array<Order>) {
  const newOrders = [...orders];
  newOrders.sort((a, b) => {
    if (a.status === OrderStatus.completed
      && b.status !== OrderStatus.completed) {
      return 1;
    }

    if (b.status === OrderStatus.completed
      && a.status !== OrderStatus.completed) {
      return -1;
    }

    if (a.status === OrderStatus.inProgress
      && b.status !== OrderStatus.inProgress) {
      return 1;
    }

    if (b.status === OrderStatus.inProgress
      && a.status !== OrderStatus.inProgress) {
      return -1;
    }

    if (a.status === OrderStatus.registration
      && b.status !== OrderStatus.registration) {
      return 1;
    }

    if (b.status === OrderStatus.inProgress
      && a.status !== OrderStatus.inProgress) {
      return -1;
    }

    return Number(b.startDate) - Number(a.startDate);
  });

  return newOrders;
}