import { put, select, takeLatest } from 'redux-saga/effects';
import { CATALOG_UPDATE, CatalogUpdateAction } from '../types';
import { syncPageURLWithCatalog } from '../../../utils/syncPageURLWithCatalog';
import { loadProducts } from './loadProducts';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';

/**
 * Watches for latest CATALOG_UPDATE action
 * and starts catalogUpdate tasks each
 * CATALOG_UPDATE dispatch.
 */
export function* watchCatalogUpdate() {
  yield takeLatest(CATALOG_UPDATE, catalogUpdate);
}

/**
 * catalogUpdate - updates catalog with products,
 * fetched with passed filters and searchQuery.
 * Updates catalog with passed filters and searchQuery.
 * Also synchronize passed filters and searchQuery
 * with page URL query.
 *
 * @param appliedFilters
 * @param searchQuery
 */
function* catalogUpdate({
  payload: { appliedFilters, searchQuery }
}: CatalogUpdateAction) {
  const { filters } = yield select((state) => state.catalog);

  syncPageURLWithCatalog(appliedFilters, searchQuery, filters);

  yield put(applyFiltersAction(appliedFilters));
  yield put(applySearchAction(searchQuery));

  yield loadProducts(appliedFilters, searchQuery);
}
