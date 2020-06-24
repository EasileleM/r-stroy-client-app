import { Product } from './Product';

export interface Pagination {
  products: Array<Product>;
  pagesAmount: number;
}