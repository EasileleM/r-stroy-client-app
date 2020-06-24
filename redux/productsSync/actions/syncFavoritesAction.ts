import { SYNC_FAVORITES, SyncFavoritesAction } from '../types';
import { Product } from '../../../interfaces/Product';

export function syncFavoritesAction(
  newFavorites: Array<Product>
): SyncFavoritesAction {
  return {
    type: SYNC_FAVORITES,
    payload: newFavorites
  };
}