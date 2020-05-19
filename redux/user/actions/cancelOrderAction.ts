import { Order } from '../../../interfaces/Order';
import { CANCEL_ORDER, CancelOrderAction } from '../types';

export function cancelOrderAction(order: Order): CancelOrderAction {
  return {
    type: CANCEL_ORDER,
    payload: order
  };
}