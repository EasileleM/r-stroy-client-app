import { OrderStatus } from '../enums/OrderStatus';
import { CartProduct } from './CartProduct';

export interface Order {
  id: string;
  products: Array<CartProduct>;
  arrivalPoint: string;
  status: OrderStatus;
  startDate: Date;
  completedDate: Date;
}