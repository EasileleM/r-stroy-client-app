import { SYNC_CART, SyncCartAction } from '../types';
import { Product } from '../../../interfaces/Product';

export function syncCartAction(newCart: Array<Product>): SyncCartAction {
  return {
    type: SYNC_CART,
    payload: newCart
  };
}