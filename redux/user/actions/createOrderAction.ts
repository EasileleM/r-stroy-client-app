import { CREATE_ORDER, CreateOrderAction } from '../types';
import { Order } from '../../../interfaces/Order';

export function createOrderAction(order: Order): CreateOrderAction {
  return {
    type: CREATE_ORDER,
    payload: order
  };
}