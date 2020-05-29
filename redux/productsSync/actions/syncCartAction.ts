import { SYNC_CART, SyncCartAction } from '../types';
import { CartProduct } from '../../../interfaces/CartProduct';

export function syncCartAction(newCart: Array<CartProduct>): SyncCartAction {
  return {
    type: SYNC_CART,
    payload: newCart
  };
}