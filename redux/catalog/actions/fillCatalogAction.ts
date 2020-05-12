import { ParsedUrlQueryInput } from 'querystring';
import { AppThunk } from '../../rootTypes';
import { updateProductsAction } from './updateProductsAction';
import { updateFiltersAction } from './updateFiltersAction';
import { applyFiltersAction } from './applyFiltersAction';
import { applySearchAction } from './applySearchAction';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const fillCatalogAction = (query: ParsedUrlQueryInput): AppThunk => async (dispatch) => {
  const filters = await dispatch(updateFiltersAction());
  const appliedFilters = getAppliedFiltersFromQuery(query, filters);
  const searchQuery = query.q as string;
  dispatch(applyFiltersAction(appliedFilters));
  dispatch(applySearchAction(searchQuery));
  await dispatch(updateProductsAction({ appliedFilters, searchQuery }));
};
