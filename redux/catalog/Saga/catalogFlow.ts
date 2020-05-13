import { fork, call, take, takeLatest, cancel, put, select } from 'redux-saga/effects';
import { fetchFilters } from '../../../utils/data/fetchFilters';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';
import { updateFiltersAction } from '../actions/updateFiltersAction';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { updateProductsActionCreator } from '../actions/updateProductsAction';
import { changeProductsLoadingStateAction } from '../actions/changeProductsLoadingStateAction';
import { fetchProducts } from '../../../utils/data/fetchProducts';
import { syncHistoryWithCatalog } from '../../../utils/syncHistoryWithCatalog';
import { CATALOG_INIT, CATALOG_RESET, CATALOG_UPDATE, CatalogUpdateAction } from '../interfaces';
import { changeFiltersLoadingStateAction } from '../actions/changeFiltersLoadingStateAction';

export function* catalogFlow() {
  while (true) {
    yield call(catalogInit);
    const updateTask = yield fork(watchCatalogUpdate);
    yield take(CATALOG_RESET);
    yield cancel(updateTask);
    yield call(catalogReset);
  }
}

function* watchCatalogUpdate() {
  while(true) {
    yield takeLatest(CATALOG_UPDATE, catalogUpdate);
  }
}

function* catalogUpdate(action: CatalogUpdateAction) {
  const { appliedFilters, searchQuery, router } = action.payload;
  const { filters } = yield select((state) => state.catalog);

  yield syncHistoryWithCatalog(appliedFilters, searchQuery, filters, router);

  yield loadProducts(appliedFilters, searchQuery);
}

function* catalogInit() {
  const { query } = yield take(CATALOG_INIT);

  yield put(changeFiltersLoadingStateAction(true));
  const filters = yield call(fetchFilters);
  yield put(updateFiltersAction(filters));
  yield put(changeFiltersLoadingStateAction(false));

  const appliedFilters = getAppliedFiltersFromQuery(query, filters);
  const searchQuery = query.q as string;

  yield loadProducts(appliedFilters, searchQuery);
}

function* catalogReset() {
  yield take(CATALOG_RESET);
  
  const { filters } = yield select((state) => state.catalog);
  yield applyFiltersAction({ ...filters, types: [] });

  yield applySearchAction('');
  yield updateProductsActionCreator([]);

}

function* loadProducts(appliedFilters, searchQuery) {
  yield put(applyFiltersAction(appliedFilters));
  yield put(applySearchAction(searchQuery));

  yield put(changeProductsLoadingStateAction(true));
  const products = yield call(fetchProducts, appliedFilters, searchQuery);
  yield put(updateProductsActionCreator(products));
  yield put(changeProductsLoadingStateAction(false));
}