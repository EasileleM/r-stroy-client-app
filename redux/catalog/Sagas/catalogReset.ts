import { cancel, put, take } from 'redux-saga/effects';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { updateProductsAction } from '../actions/updateProductsAction';
import { CATALOG_RESET } from '../types';
import { updateFiltersAction } from '../actions/updateFiltersAction';
import { changeFiltersLoadingStateAction } from '../actions/changeFiltersLoadingStateAction';
import { changeProductsLoadingStateAction } from '../actions/changeProductsLoadingStateAction';

/**
 * Resets catalog with default values and cancels updateTask
 *
 * @param updateTask - updateTask to cancel
 */
export function* catalogReset(updateTask = null) {
  yield take(CATALOG_RESET);
  if (updateTask) {
    yield cancel(updateTask);
  }

  yield put(applyFiltersAction(null));
  yield put(updateFiltersAction(null));
  yield put(applySearchAction(''));
  yield put(updateProductsAction([]));
  yield put(changeFiltersLoadingStateAction(true));
  yield put(changeProductsLoadingStateAction(true));
}
