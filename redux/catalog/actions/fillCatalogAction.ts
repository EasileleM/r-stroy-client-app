import { AppThunk } from '../../rootTypes';
import { updateProductsAction } from './updateProductsAction';
import { updateFiltersAction } from './updateFiltersAction';

/**
 * Fills catalog with products and filters
 */
export const fillCatalogAction = (): AppThunk => async (dispatch) => {
  dispatch(updateFiltersAction());
  dispatch(updateProductsAction({}));
};
