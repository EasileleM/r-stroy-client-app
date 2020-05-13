import { call, put, take } from 'redux-saga/effects';
import { CATALOG_INIT } from '../interfaces';
import { changeFiltersLoadingStateAction } from '../actions/changeFiltersLoadingStateAction';
import { fetchFilters } from '../../../utils/data/fetchFilters';
import { updateFiltersAction } from '../actions/updateFiltersAction';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';
import { loadProducts } from './loadProducts';

export function* catalogInit() {
  const { payload: query } = yield take(CATALOG_INIT);

  yield put(changeFiltersLoadingStateAction(true));
  const filters = yield call(fetchFilters);
  yield put(updateFiltersAction(filters));
  yield put(changeFiltersLoadingStateAction(false));

  const appliedFilters = getAppliedFiltersFromQuery(query, filters);
  const searchQuery = query.q as string;

  yield loadProducts(appliedFilters, searchQuery);
}
