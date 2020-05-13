import { select, take } from 'redux-saga/effects';
import { CATALOG_RESET } from '../interfaces';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { updateProductsAction } from '../actions/updateProductsAction';

export function* catalogReset() {
  yield take(CATALOG_RESET);

  const { filters } = yield select((state) => state.catalog);
  yield applyFiltersAction({ ...filters, types: [] });

  yield applySearchAction('');
  yield updateProductsAction([]);
}
