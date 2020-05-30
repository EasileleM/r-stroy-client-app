import { put, select } from '@redux-saga/core/effects';
import { syncOrdersAction } from '../actions/syncOrdersAction';
import { arrayIncludesProduct } from '../../../utils/arrayIncludesProduct';

export function* syncFavoritesWithOrders() {
  const {
    user: {
      favoritesProducts,
      orders,
      isGuest
    }
  } = yield select();

  if (!isGuest) {
    const newOrders = orders.map(order => {
      const newOrder = { ...order };
      newOrder.products = order.products.map(product => {
        return {
          ...product,
          inFavorites: arrayIncludesProduct(favoritesProducts, product)
        };
      });
      return newOrder;
    });

    yield put(syncOrdersAction(newOrders));
  }
}