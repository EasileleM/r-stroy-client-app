import { all, put, select, takeLatest } from '@redux-saga/core/effects';
import { INIT_USER, UPDATE_CART, UPDATE_FAVORITES, UPDATE_ORDERS } from '../../user/types';
import { UPDATE_PRODUCTS } from '../../catalog/types';
import { RootState } from '../../types';
import { syncFavoritesAction } from '../actions/syncFavoritesAction';
import { syncCatalogAction } from '../actions/syncCatalogAction';
import { syncOrdersAction } from '../actions/syncOrdersAction';
import { syncCartAction } from '../actions/syncCartAction';

export function* syncProductsFlow() {
  yield all([
    takeLatest(UPDATE_ORDERS, syncOrders),
    takeLatest(UPDATE_CART, syncCart),
    takeLatest(UPDATE_FAVORITES, syncFavorites),
    takeLatest(UPDATE_PRODUCTS, syncCatalog),
    takeLatest(INIT_USER, syncAll)
  ]);
}

function* syncCatalog() {
  const {
    catalog: { products: catalogProducts },
    user: {
      cartProducts,
      favoritesProducts
    }
  }: RootState = yield select();

  const newCatalogProducts = [...catalogProducts];

  for (const product of newCatalogProducts) {
    product.inFavorites = productInFavorites(favoritesProducts, product);
    product.inCart = productInCart(cartProducts, product);
  }

  yield put(syncCatalogAction(newCatalogProducts));
}

function* syncOrders() {
  const {
    user: {
      cartProducts,
      favoritesProducts,
      orders
    }
  }: RootState = yield select();

  const newOrders = [...orders];

  for (const order of newOrders) {
    const newOrderProducts = [...order.products];
    for (const product of newOrderProducts) {
      product.inFavorites = productInFavorites(favoritesProducts, product);
      product.inCart = productInCart(cartProducts, product);
    }
    order.products = newOrderProducts;
  }

  yield put(syncOrdersAction(newOrders));
}

function* syncFavorites() {
  const {
    catalog: { products: catalogProducts },
    user: {
      cartProducts,
      favoritesProducts,
      orders
    }
  }: RootState = yield select();

  const newCatalogProducts = [...catalogProducts];
  const newCartProducts = [...cartProducts];
  const newOrders = [...orders];

  for (const product of newCatalogProducts) {
    product.inFavorites = productInFavorites(favoritesProducts, product);
  }

  for (const product of newCartProducts) {
    product.inFavorites = productInFavorites(favoritesProducts, product);
  }

  for (const order of newOrders) {
    const newOrderProducts = [...order.products];
    for (const product of newOrderProducts) {
      product.inFavorites = productInFavorites(favoritesProducts, product);
    }
    order.products = newOrderProducts;
  }

  yield put(syncFavoritesAction(newCartProducts));
  yield put(syncCatalogAction(newCatalogProducts));
  yield put(syncOrdersAction(newOrders));
}

function* syncCart() {
  const {
    catalog: { products: catalogProducts },
    user: {
      cartProducts,
      favoritesProducts,
      orders
    }
  }: RootState = yield select();

  const newCatalogProducts = [...catalogProducts];
  const newFavoritesProducts = [...favoritesProducts];
  const newOrders = [...orders];
  
  for (const product of newCatalogProducts) {
    product.inCart = productInCart(cartProducts, product);
  }

  for (const product of newFavoritesProducts) {
    product.inCart = productInCart(cartProducts, product);
  }
  
  for (const order of newOrders) {
    const newOrderProducts = [...order.products];
    for (const product of newOrderProducts) {
      product.inCart = productInCart(cartProducts, product);
    }
    order.products = newOrderProducts;
  }
  
  yield put(syncFavoritesAction(newFavoritesProducts));
  yield put(syncCatalogAction(newCatalogProducts));
  yield put(syncOrdersAction(newOrders));
}

function* syncAll() {
  const {
    catalog: { products: catalogProducts },
    user: {
      cartProducts,
      favoritesProducts,
      orders
    }
  }: RootState = yield select();

  const newCatalogProducts = [...catalogProducts];
  const newFavoritesProducts = [...favoritesProducts];
  const newCartProducts = [...cartProducts];
  const newOrders = [...orders];

  for (const product of newCatalogProducts) {
    product.inCart = productInCart(cartProducts, product);
    product.inFavorites = productInFavorites(favoritesProducts, product);
  }

  for (const product of newFavoritesProducts) {
    product.inCart = productInCart(cartProducts, product);
    product.inFavorites = true;
  }

  for (const product of newCartProducts) {
    product.inCart = true;
    product.inFavorites = productInFavorites(favoritesProducts, product);
  }

  for (const order of newOrders) {
    const newOrderProducts = [...order.products];
    for (const product of newOrderProducts) {
      product.inCart = productInCart(cartProducts, product);
      product.inFavorites = productInFavorites(favoritesProducts, product);
    }
    order.products = newOrderProducts;
  }

  yield put(syncFavoritesAction(newFavoritesProducts));
  yield put(syncCartAction(newCartProducts));
  yield put(syncCatalogAction(newCatalogProducts));
  yield put(syncOrdersAction(newOrders));
}

function productInFavorites(favoritesProducts, product): boolean {
  return Boolean(favoritesProducts.find(({ id }) => id === product.id));
}

function productInCart(cartProducts, product): boolean {
  return Boolean(cartProducts.find(({ id }) => id === product.id));
}