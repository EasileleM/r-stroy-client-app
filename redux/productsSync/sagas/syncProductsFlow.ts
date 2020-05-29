import { all, put, select, takeLatest } from '@redux-saga/core/effects';
import { INIT_USER, UPDATE_FAVORITES, UPDATE_ORDERS } from '../../user/types';
import { UPDATE_PRODUCTS } from '../../catalog/types';
import { syncCatalogAction } from '../actions/syncCatalogAction';
import { syncOrdersAction } from '../actions/syncOrdersAction';
import { syncCartAction } from '../actions/syncCartAction';
import { syncFavoritesAction } from '../actions/syncFavoritesAction';

export function* syncProductsFlow() {
  yield all([
    takeLatest(UPDATE_ORDERS, syncFavoritesWithOrders),
    takeLatest(UPDATE_FAVORITES, syncFavorites),
    takeLatest(UPDATE_PRODUCTS, syncFavoritesWithCatalog),
    takeLatest(INIT_USER, syncFavorites)
  ]);
}

function* syncFavorites() {
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

function* syncFavoritesWithCart() {
  const {
    user: {
      cartProducts,
      favoritesProducts
    }
  } = yield select();

  const newCartProducts = cartProducts.map(product => {
    return {
      ...product,
      inFavorites: productInFavorites(favoritesProducts, product)
    };
  });

  yield put(syncCartAction(newCartProducts));
}

function* syncFavoritesWithCatalog() {
  const {
    catalog: { products: catalogProducts },
    user: {
      favoritesProducts
    }
  } = yield select();

  const newCatalogProducts = catalogProducts.map(product => {
    return {
      ...product,
      inFavorites: productInFavorites(favoritesProducts, product)
    };
  });

  yield put(syncCatalogAction(newCatalogProducts));
}

function* syncFavoritesWithOrders() {
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
          inFavorites: productInFavorites(favoritesProducts, product)
        };
      });
      return newOrder;
    });

    yield put(syncOrdersAction(newOrders));
  }
}

function productInFavorites(favoritesProducts, product): boolean {
  return Boolean(favoritesProducts.find(({ id }) => id === product.id));
}