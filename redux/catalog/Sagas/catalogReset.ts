import { cancel, select, take } from 'redux-saga/effects';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { updateProductsAction } from '../actions/updateProductsAction';
import { CATALOG_RESET } from '../types';

/**
 * Resets catalog with default values and cancels updateTask
 *
 * @param updateTask - updateTask to cancel
 */
export function* catalogReset(updateTask) {
  yield take(CATALOG_RESET);
  yield cancel(updateTask);

  const { filters } = yield select((state) => state.catalog);
  yield applyFiltersAction({ ...filters, types: [] });

  yield applySearchAction('');
  yield updateProductsAction([]);
}
