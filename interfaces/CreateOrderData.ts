import { OrderProduct } from './OrderProduct';

export interface CreateOrderData {
  products: Array<OrderProduct>;
  description: string;
  arrivalPoint: string;
}