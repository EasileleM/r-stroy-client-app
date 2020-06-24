import { CANCEL_ORDER, CancelOrderAction } from '../types';
import { Order } from '../../../interfaces/Order';

export function cancelOrderAction(
  order: Order
): CancelOrderAction {
  return {
    type: CANCEL_ORDER,
    payload: order
  };
}