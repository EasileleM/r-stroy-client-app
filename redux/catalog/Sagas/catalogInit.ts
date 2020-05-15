import { call, put, take } from 'redux-saga/effects';
import { CATALOG_INIT } from '../types';
import { changeFiltersLoadingStateAction } from '../actions/changeFiltersLoadingStateAction';
import { fetchFilters } from '../../../utils/data/fetchFilters';
import { updateFiltersAction } from '../actions/updateFiltersAction';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';
import { loadProducts } from './loadProducts';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { getSearchValueFromQuery } from '../../../utils/getSearchValueFromQuery';

/**
 * Loads initial filters with loading indicator - areFiltersLoading.
 * Dispatches appliedFilters and searchQuery from query.
 * Loads products with that filters and searchQuery.
 */
export function* catalogInit() {
  yield take(CATALOG_INIT);
  yield put(changeFiltersLoadingStateAction(true));
  const filters = yield call(fetchFilters);
  yield put(updateFiltersAction(filters));

  const appliedFilters = getAppliedFiltersFromQuery(filters);
  const searchQuery = getSearchValueFromQuery();

  yield put(applyFiltersAction(appliedFilters));
  yield put(applySearchAction(searchQuery));

  yield put(changeFiltersLoadingStateAction(false));

  yield loadProducts(appliedFilters, searchQuery);
}
