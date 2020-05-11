import { AppThunk } from '../../rootTypes';
import { CatalogActionTypes, UPDATE_PRODUCTS } from '../interfaces';
import { fetchProducts } from '../../../dataFetching/fetchProducts';
import { Product } from '../../../interfaces/Product';

// eslint-disable-next-line max-len
function updateProductsActionCreator(products: Array<Product>): CatalogActionTypes {
  return {
    type: UPDATE_PRODUCTS,
    payload: products
  };
}

/**
 * Fetches products with applied filters and search query
 */
// eslint-disable-next-line max-len
export const updateProductsAction = (
  { appliedFilters = null, searchQuery = null }
): AppThunk => async (dispatch) => {
  const products = await fetchProducts(appliedFilters, searchQuery);
  dispatch(updateProductsActionCreator(products));
};
