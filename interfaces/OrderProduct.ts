import { Product } from './Product';

export interface OrderProduct extends Product{
  amountInOrder: number;
}