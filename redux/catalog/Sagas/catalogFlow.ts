import { fork, call, take, cancel } from 'redux-saga/effects';
import { CATALOG_RESET } from '../interfaces';
import { watchCatalogUpdate } from './catalogUpdate';
import { catalogInit } from './catalogInit';
import { catalogReset } from './catalogReset';

export function* catalogFlow() {
  while (true) {
    yield call(catalogInit);
    const updateTask = yield fork(watchCatalogUpdate);
    yield take(CATALOG_RESET);
    yield cancel(updateTask);
    yield call(catalogReset);
  }
}
