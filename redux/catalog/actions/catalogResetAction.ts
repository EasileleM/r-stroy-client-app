import { AppThunk } from '../../types';
import { updateProductsActionCreator } from './updateProductsAction';
import { applyFiltersAction } from './applyFiltersAction';
import { applySearchAction } from './applySearchAction';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const catalogResetAction = (): AppThunk => async (dispatch, getState) => {
  const { filters } = getState().catalog;
  dispatch(updateProductsActionCreator([]));
  dispatch(applyFiltersAction({ ...filters, types: [] }));
  dispatch(applySearchAction(''));
};
