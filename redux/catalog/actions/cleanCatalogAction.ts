import { AppThunk } from '../../rootTypes';
import { updateProductsActionCreator } from './updateProductsAction';
import { applyFiltersAction } from './applyFiltersAction';
import { applySearchAction } from './applySearchAction';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const cleanCatalogAction = (): AppThunk => async (dispatch, getState) => {
  const { filters } = getState().catalog;
  dispatch(updateProductsActionCreator([]));
  dispatch(applyFiltersAction({ ...filters, types: [] }));
  dispatch(applySearchAction(''));
};
