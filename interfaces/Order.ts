import { Product } from './Product';
import { OrderStatus } from '../enums/OrderStatus';

export interface Order {
  id: string;
  products: Array<Product>;
  status: OrderStatus;
  startDate: Date;
  completedDate: Date;
}