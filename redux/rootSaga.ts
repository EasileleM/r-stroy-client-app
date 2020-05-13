import { all } from '@redux-saga/core/effects';
import { catalogFlow } from './catalog/Sagas/catalogFlow';

export function* rootSaga() {
  yield all([
    catalogFlow()
  ]);
}