import { UPDATE_PRODUCTS, UpdateProductsAction } from '../types';
import { Pagination } from '../../../interfaces/Pagination';

export function updateProductsAction({
  products, pagesAmount 
}: Pagination): UpdateProductsAction {
  return {
    type: UPDATE_PRODUCTS,
    payload: {
      products,
      pagesAmount
    }
  };
}
