import { call, put } from 'redux-saga/effects';
import { applyFiltersAction } from '../actions/applyFiltersAction';
import { applySearchAction } from '../actions/applySearchAction';
import { changeProductsLoadingStateAction } from '../actions/changeProductsLoadingStateAction';
import { fetchProducts } from '../../../utils/data/fetchProducts';
import { updateProductsAction } from '../actions/updateProductsAction';

export function* loadProducts(appliedFilters, searchQuery) {
  yield put(applyFiltersAction(appliedFilters));
  yield put(applySearchAction(searchQuery));

  yield put(changeProductsLoadingStateAction(true));
  const products = yield call(fetchProducts, appliedFilters, searchQuery);
  yield put(updateProductsAction(products));
  yield put(changeProductsLoadingStateAction(false));
}