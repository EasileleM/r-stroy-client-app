import { Order } from '../../../interfaces/Order';
import { SYNC_ORDERS, SyncOrdersAction } from '../types';

export function syncOrdersAction(
  newOrders: Array<Order>
): SyncOrdersAction {
  return {
    type: SYNC_ORDERS,
    payload: newOrders
  };
}