import { select, takeLatest } from '@redux-saga/core/effects';

export function* syncProductsFlow() {
  yield takeLatest([], syncProductsWorker);
}

export function* syncProductsWorker() {
  const state = yield select();
  const { catalog: { products } } = state;
  const { user: { cartProducts, favoritesProducts, orders } } = state;
  // perform sync
}