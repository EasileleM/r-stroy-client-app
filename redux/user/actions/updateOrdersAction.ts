import { Order } from '../../../interfaces/Order';
import { UPDATE_ORDERS, UpdateOrdersAction } from '../types';

export function updateOrdersAction(orders: Array<Order>): UpdateOrdersAction {
  return {
    type: UPDATE_ORDERS,
    payload: orders
  };
}