import { UPDATE_FAVORITES, UpdateFavoritesAction } from '../types';
import { Product } from '../../../interfaces/Product';

export function updateFavoritesAction(
  favorites: Array<Product>
): UpdateFavoritesAction {
  return {
    type: UPDATE_FAVORITES,
    payload: favorites
  };
}