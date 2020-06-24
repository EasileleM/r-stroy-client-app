import { all } from '@redux-saga/core/effects';
import { syncProductsFlow } from './sagas/syncProductsFlow';

export function* syncProductsSaga() {
  yield all([
    syncProductsFlow()
  ]);
}