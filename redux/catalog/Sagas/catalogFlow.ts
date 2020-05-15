import { fork, call, put } from 'redux-saga/effects';
import { watchCatalogUpdate } from './catalogUpdate';
import { catalogInit } from './catalogInit';
import { catalogReset } from './catalogReset';
import { catalogErrorAction } from '../actions/catalogErrorAction';

/**
 * Controls catalog data flow
 */
export function* catalogFlow() {
  while (true) {
    try {
      yield put(catalogErrorAction(false));
      yield call(catalogInit);
      const updateTask = yield fork(watchCatalogUpdate);
      yield call(catalogReset, updateTask);
    } catch (e) {
      yield put(catalogErrorAction(true));
    }
  }
}
