import { all } from '@redux-saga/core/effects';
import { userFlow } from './sagas/userFlow';

export function* userSaga() {
  yield all([
    userFlow()
  ]);
}