import { call, put, take } from 'redux-saga/effects';
import { CATALOG_INIT } from '../types';
import { changeFiltersLoadingStateAction } from '../actions/changeFiltersLoadingStateAction';
import { updateFiltersAction } from '../actions/updateFiltersAction';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';
import { loadProducts } from './loadProducts';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { getSearchValueFromQuery } from '../../../utils/getSearchValueFromQuery';
import { productsApiService } from '../../../services/productsApiService';
import { getPageFromQuery } from '../../../utils/getPageFromQuery';
import { changePageAction } from '../actions/changePageAction';

/**
 * Loads initial filters with loading indicator - areFiltersLoading.
 * Dispatches appliedFilters and searchQuery from query.
 * Loads products with that filters and searchQuery.
 */
export function* catalogInit() {
  yield take(CATALOG_INIT);
  yield put(changeFiltersLoadingStateAction(true));
  const filters = yield call(productsApiService.getFilters);
  yield put(updateFiltersAction(filters));

  const appliedFilters = getAppliedFiltersFromQuery(filters);
  const searchQuery = getSearchValueFromQuery();
  const page = getPageFromQuery();

  yield put(applyFiltersAction(appliedFilters));
  yield put(applySearchAction(searchQuery));
  yield put(changePageAction(page));

  yield put(changeFiltersLoadingStateAction(false));

  yield loadProducts(appliedFilters, searchQuery, page);
}
