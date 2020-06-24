import { fork, call } from 'redux-saga/effects';
import { watchCatalogUpdates } from './watchCatalogUpdates';
import { catalogInit } from './catalogInit';
import { catalogReset } from './catalogReset';

/**
 * Controls catalog data flow
 */
export function* catalogFlow() {
  while (true) {
    yield call(catalogInit);
    const updateTask = yield fork(watchCatalogUpdates);
    yield call(catalogReset, updateTask);
  }
}
