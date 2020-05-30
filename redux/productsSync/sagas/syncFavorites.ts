import { all, put, select } from '@redux-saga/core/effects';
import { syncFavoritesAction } from '../actions/syncFavoritesAction';
import { syncFavoritesWithCatalog } from './syncFavoritesWithCatalog';
import { syncFavoritesWithOrders } from './syncFavoritesWithOrders';
import { syncFavoritesWithCart } from './syncFavoritesWithCart';

export function* syncFavorites() {
  const {
    user: {
      favoritesProducts
    }
  } = yield select();

  const newFavoritesProducts = favoritesProducts.map(product => {
    return {
      ...product,
      inFavorites: true
    };
  });

  yield all([
    put(syncFavoritesAction(newFavoritesProducts)),
    syncFavoritesWithCatalog(),
    syncFavoritesWithOrders(),
    syncFavoritesWithCart()
  ]);
}