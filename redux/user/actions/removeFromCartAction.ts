import { REMOVE_FROM_CART, RemoveFromCartAction } from '../types';
import { CartProduct } from '../../../interfaces/CartProduct';

export function removeFromCartAction(
  product: CartProduct
): RemoveFromCartAction {
  return {
    type: REMOVE_FROM_CART,
    payload: product
  };
}