import { all } from '@redux-saga/core/effects';
import { catalogFlow } from './Sagas/catalogFlow';

export function* catalogSaga() {
  yield all([
    catalogFlow()
  ]);
}