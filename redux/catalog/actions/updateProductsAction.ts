import { CatalogActionTypes, UPDATE_PRODUCTS } from '../interfaces';
import { Product } from '../../../interfaces/Product';

// eslint-disable-next-line max-len
export function updateProductsAction(products: Array<Product>): CatalogActionTypes {
  return {
    type: UPDATE_PRODUCTS,
    payload: products
  };
}
