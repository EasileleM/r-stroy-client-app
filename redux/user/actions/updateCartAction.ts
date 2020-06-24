import { UPDATE_CART, UpdateCartAction } from '../types';
import { CartProduct } from '../../../interfaces/CartProduct';

export function updateCartAction(cart: Array<CartProduct>): UpdateCartAction {
  return {
    type: UPDATE_CART,
    payload: cart
  };
}