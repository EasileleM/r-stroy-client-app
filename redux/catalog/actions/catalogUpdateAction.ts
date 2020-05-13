import { AppThunk } from '../../types';
import { updateProductsAction } from './updateProductsAction';
import { syncHistoryWithCatalog } from '../../../utils/syncHistoryWithCatalog';
import { applyFiltersAction } from './applyFiltersAction';
import { applySearchAction } from './applySearchAction';

/**
 * Fills catalog with products and filters
 */
export const catalogUpdateAction = (
  appliedFilters, searchQuery, router
): AppThunk => async (dispatch, getState) => {
  dispatch(applyFiltersAction(appliedFilters));
  dispatch(applySearchAction(searchQuery));

  const { filters } = getState().catalog;
  await syncHistoryWithCatalog(appliedFilters, searchQuery, filters, router);

  await dispatch(updateProductsAction({ appliedFilters, searchQuery }));
};
