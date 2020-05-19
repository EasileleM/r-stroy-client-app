import { Product } from '../../../interfaces/Product';
import { REMOVE_FROM_CART, RemoveFromCartAction } from '../types';

export function removeFromCartAction(product: Product): RemoveFromCartAction {
  return {
    type: REMOVE_FROM_CART,
    payload: product
  };
}