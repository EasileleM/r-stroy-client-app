import { all, takeLatest } from '@redux-saga/core/effects';
import { INIT_USER, UPDATE_CART, UPDATE_FAVORITES, UPDATE_ORDERS } from '../../user/types';
import { UPDATE_PRODUCTS } from '../../catalog/types';

import { syncFavorites } from './syncFavorites';
import { syncFavoritesWithCatalog } from './syncFavoritesWithCatalog';
import { syncFavoritesWithOrders } from './syncFavoritesWithOrders';
import { syncFavoritesWithCart } from './syncFavoritesWithCart';

export function* syncProductsFlow() {
  yield all([
    takeLatest(UPDATE_ORDERS, syncFavoritesWithOrders),
    takeLatest(UPDATE_FAVORITES, syncFavorites),
    takeLatest(UPDATE_PRODUCTS, syncFavoritesWithCatalog),
    takeLatest(UPDATE_CART, syncFavoritesWithCart),
    takeLatest(INIT_USER, syncFavorites)
  ]);
}