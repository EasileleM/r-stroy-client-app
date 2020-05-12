import { AppThunk } from '../../rootTypes';
import { CatalogActionTypes, UPDATE_PRODUCTS } from '../interfaces';
import { fetchProducts } from '../../../utils/data/fetchProducts';
import { Product } from '../../../interfaces/Product';
import { Filters } from '../../../interfaces/Filters';

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
export const updateProductsAction = (
  appliedFilters: Filters = null,
  searchQuery: string
): AppThunk => async (dispatch) => {
  const products = await fetchProducts(appliedFilters, searchQuery);
  await dispatch(updateProductsActionCreator(products));
};
