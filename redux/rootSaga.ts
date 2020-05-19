import { all } from '@redux-saga/core/effects';
import { userSaga } from './user/userSaga';
import { catalogSaga } from './catalog/catalogSaga';
import { syncProductsSaga } from './productsSync/syncProductsSaga';

export function* rootSaga() {
  yield all([
    catalogSaga(),
    userSaga(),
    syncProductsSaga()
  ]);
}