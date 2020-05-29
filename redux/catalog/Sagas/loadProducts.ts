import { call, put } from 'redux-saga/effects';
import { changeProductsLoadingStateAction } from '../actions/changeProductsLoadingStateAction';
import { updateProductsAction } from '../actions/updateProductsAction';
import { productsApiService } from '../../../services/productsApiService';

/**
 * Loads products with given appliedFilters and searchQuery.
 * Tracks downloading state by areProductsLoading property.
 *
 * @param appliedFilters
 * @param searchQuery
 * @param currentPage
 */
export function* loadProducts(appliedFilters, searchQuery, currentPage) {
  yield put(changeProductsLoadingStateAction(true));
  const {
    products,
    pagesAmount
  } = yield call(
    productsApiService.getProducts,
    appliedFilters,
    searchQuery,
    currentPage
  );

  yield put(updateProductsAction({ products, pagesAmount }));
  yield put(changeProductsLoadingStateAction(false));
}