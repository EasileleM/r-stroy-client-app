import { OrderStatus } from '../enums/OrderStatus';
import { CartProduct } from './CartProduct';

export interface Order {
  id: string;
  products: Array<CartProduct>;
  status: OrderStatus;
  startDate: Date;
  completedDate: Date;
}