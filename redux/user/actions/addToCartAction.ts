import { ADD_TO_CART, AddToCartAction } from '../types';
import { CartProduct } from '../../../interfaces/CartProduct';

export function addToCartAction(product: CartProduct): AddToCartAction {
  return {
    type: ADD_TO_CART,
    payload: product
  };
}