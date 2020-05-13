import { select, takeLatest } from 'redux-saga/effects';
import { CATALOG_UPDATE, CatalogUpdateAction } from '../interfaces';
import { syncHistoryWithCatalog } from '../../../utils/syncHistoryWithCatalog';
import { loadProducts } from './loadProducts';

export function* watchCatalogUpdate() {
  yield takeLatest(CATALOG_UPDATE, catalogUpdate);
}

function* catalogUpdate(action: CatalogUpdateAction) {
  const { appliedFilters, searchQuery, router } = action.payload;
  const { filters } = yield select((state) => state.catalog);

  yield syncHistoryWithCatalog(appliedFilters, searchQuery, filters, router);

  yield loadProducts(appliedFilters, searchQuery);
}
