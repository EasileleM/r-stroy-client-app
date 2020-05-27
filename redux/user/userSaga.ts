import { all } from '@redux-saga/core/effects';
import { userFlow } from './sagas/userFlow/userFlow';

export function* userSaga() {
  yield all([
    userFlow()
  ]);
}