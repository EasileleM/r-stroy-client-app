import { ParsedUrlQueryInput } from 'querystring';
import { AppThunk } from '../../rootTypes';
import { updateProductsAction } from './updateProductsAction';
import { updateFiltersAction } from './updateFiltersAction';
import { applyFiltersAction } from './applyFiltersAction';
import { applySearchAction } from './applySearchAction';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';
import { changeLoadingStateAction } from './changeLoadingStateAction';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const fillCatalogAction = (query: ParsedUrlQueryInput): AppThunk => async (dispatch) => {
  dispatch(changeLoadingStateAction(true));
  const filters = await dispatch(updateFiltersAction());
  const appliedFilters = getAppliedFiltersFromQuery(query, filters);
  const searchQuery = query.q as string;
  dispatch(applyFiltersAction(appliedFilters));
  dispatch(applySearchAction(searchQuery));
  dispatch(changeLoadingStateAction(false));
  await dispatch(updateProductsAction({ appliedFilters, searchQuery }));
};
