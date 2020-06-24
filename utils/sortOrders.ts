import { Order } from '../interfaces/Order';
import { OrderStatus } from '../enums/OrderStatus';

export function sortOrders(orders: Array<Order>): Array<Order> {
  const result = orders.slice();
  
  result.sort((o1, o2) => {
    if (o1.status === o2.status) {
      return Number(o2.startDate) - Number(o1.startDate);
    }
    
    if (o1.status === OrderStatus.CANCELED) {
      return 1;
    }
    
    if (o1.status === OrderStatus.COMPLETED) {
      return o2.status === OrderStatus.CANCELED ? -1 : 1;
    }

    if (o1.status === OrderStatus.DELIVERING) {
      return o2.status !== OrderStatus.REGISTRATION ? -1 : 1;
    }

    return -1;
  });
  
  return result;
}