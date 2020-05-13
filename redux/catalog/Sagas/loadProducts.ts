import { call, put } from 'redux-saga/effects';
import { changeProductsLoadingStateAction } from '../actions/changeProductsLoadingStateAction';
import { fetchProducts } from '../../../utils/data/fetchProducts';
import { updateProductsAction } from '../actions/updateProductsAction';

/**
 * Loads products with given appliedFilters and searchQuery.
 * Tracks downloading state by areProductsLoading property.
 *
 * @param appliedFilters
 * @param searchQuery
 */
export function* loadProducts(appliedFilters, searchQuery) {
  yield put(changeProductsLoadingStateAction(true));
  const products = yield call(fetchProducts, appliedFilters, searchQuery);
  yield put(updateProductsAction(products));
  yield put(changeProductsLoadingStateAction(false));
}