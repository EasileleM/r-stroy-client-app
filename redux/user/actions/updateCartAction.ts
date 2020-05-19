import { Product } from '../../../interfaces/Product';
import { UPDATE_CART, UpdateCartAction } from '../types';

export function updateCartAction(cart: Array<Product>): UpdateCartAction {
  return {
    type: UPDATE_CART,
    payload: cart
  };
}