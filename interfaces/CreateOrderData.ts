import { OrderProduct } from './OrderProduct';

export interface CreateOrderData {
  id: string;
  products: Array<OrderProduct>;
  description: string;
  city: string;
  street: string;
  house: string;
}