import { Order } from '../interfaces/Order';
import { OrderStatus } from '../enums/OrderStatus';

export function deserializeOrders(orders): Array<Order> {
  const result = orders.map(order => {
    return {
      ...order,
      status: OrderStatus[order.orderStatus],
      startDate: new Date(order.created),
      products: order.stashedProducts.map(rawProduct => {
        return {
          ...rawProduct.product,
          types: rawProduct.product.types.map(type => type.name),
          amountInOrder: rawProduct.amountInStash
        };
      })
    };
  });

  return result;
}