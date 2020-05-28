import { all } from '@redux-saga/core/effects';
import { userSaga } from './user/userSaga';
import { catalogSaga } from './catalog/catalogSaga';

export function* rootSaga() {
  yield all([
    catalogSaga(),
    userSaga()
  ]);
}