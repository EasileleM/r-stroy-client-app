import { AppThunk } from '../../rootTypes';
import { CatalogActionTypes, UPDATE_PRODUCTS } from '../interfaces';
import { fetchProducts } from '../../../utils/data/fetchProducts';
import { Product } from '../../../interfaces/Product';
import { Filters } from '../../../interfaces/Filters';

// eslint-disable-next-line max-len
export function updateProductsActionCreator(products: Array<Product>): CatalogActionTypes {
  return {
    type: UPDATE_PRODUCTS,
    payload: products
  };
}

type updateProductsActionProps = {
  appliedFilters: Filters;
  searchQuery: string;
};

/**
 * Fetches products with applied filters and search query
 */
export const updateProductsAction = ({
  appliedFilters,
  searchQuery
}: updateProductsActionProps): AppThunk<Promise<void>> => async (dispatch) => {
  const products = await fetchProducts(appliedFilters, searchQuery);
  await dispatch(updateProductsActionCreator(products));
};
