import { OrderProduct } from './OrderProduct';

export interface CreateOrderData {
  id: string;
  products: Array<OrderProduct>;
  description: string;
  arrivalPoint: string;
}