import { UPDATE_PRODUCTS, UpdateProductsAction } from '../types';
import { Product } from '../../../interfaces/Product';

export function updateProductsAction(
  products: Array<Product>
): UpdateProductsAction {
  return {
    type: UPDATE_PRODUCTS,
    payload: products
  };
}
