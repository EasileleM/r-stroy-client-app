import { Product } from '../../../interfaces/Product';
import { ADD_TO_CART, AddToCartAction } from '../types';

export function addToCartAction(product: Product): AddToCartAction {
  return {
    type: ADD_TO_CART,
    payload: product
  };
}