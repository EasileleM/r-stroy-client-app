import { select, takeLatest } from 'redux-saga/effects';
import { APPLY_FILTERS, APPLY_SEARCH, CHANGE_PAGE } from '../types';
import { syncPageURLWithCatalog } from '../../../utils/syncPageURLWithCatalog';
import { loadProducts } from './loadProducts';

/**
 * Watches for latest CATALOG_UPDATE action
 * and starts watchCatalogUpdates tasks each
 * APPLY_FILTERS or APPLY_SEARCH dispatch.
 */
export function* watchCatalogUpdates() {
  yield takeLatest([
    APPLY_FILTERS,
    APPLY_SEARCH,
    CHANGE_PAGE
  ], watchCatalogUpdate);
}

/**
 * watchCatalogUpdates - updates catalog with products,
 * fetched with current filters and searchQuery.
 * Also synchronize current filters and searchQuery
 * with page URL query.
 */
function* watchCatalogUpdate() {
  const {
    filters, appliedFilters, searchQuery, currentPage
  } = yield select((state) => state.catalog);
  syncPageURLWithCatalog(appliedFilters, searchQuery, currentPage, filters);
  yield loadProducts(appliedFilters, searchQuery, currentPage);
}
