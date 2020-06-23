import { OrderStatus } from '../enums/OrderStatus';
import { OrderProduct } from './OrderProduct';

export interface Order {
  id: string;
  description: string;
  products: Array<OrderProduct>;
  arrivalPoint: string;
  status: OrderStatus;
  startDate: Date;
  completedDate: Date;
  price: String;
}