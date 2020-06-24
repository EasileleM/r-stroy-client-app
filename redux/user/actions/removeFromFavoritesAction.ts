import { Product } from '../../../interfaces/Product';
import { REMOVE_FROM_FAVORITES, RemoveFromFavoritesAction } from '../types';

export function removeFromFavoritesAction(
  product: Product
): RemoveFromFavoritesAction {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: product
  };
}