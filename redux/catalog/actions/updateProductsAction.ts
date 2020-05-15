import { CatalogActionTypes, UPDATE_PRODUCTS } from '../types';
import { Product } from '../../../interfaces/Product';

export function updateProductsAction(
  products: Array<Product>
): CatalogActionTypes {
  return {
    type: UPDATE_PRODUCTS,
    payload: products
  };
}
