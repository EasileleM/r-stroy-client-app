import { fork, call } from 'redux-saga/effects';
import { watchCatalogUpdate } from './catalogUpdate';
import { catalogInit } from './catalogInit';
import { catalogReset } from './catalogReset';

/**
 * Controls catalog data flow
 */
export function* catalogFlow() {
  while (true) {
    yield call(catalogInit);
    const updateTask = yield fork(watchCatalogUpdate);
    yield call(catalogReset, updateTask);
  }
}
