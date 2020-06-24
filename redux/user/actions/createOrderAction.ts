import { CreateOrderData } from '../../../interfaces/CreateOrderData';
import { CREATE_ORDER, CreateOrderAction } from '../types';

export function createOrderAction(
  newOrder: CreateOrderData
): CreateOrderAction {
  return {
    type: CREATE_ORDER,
    payload: newOrder
  };
}