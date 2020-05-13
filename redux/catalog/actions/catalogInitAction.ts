import { ParsedUrlQueryInput } from 'querystring';
import { AppThunk } from '../../types';
import { updateProductsAction } from './updateProductsAction';
import { updateFiltersAction } from './updateFiltersAction';
import { applyFiltersAction } from './applyFiltersAction';
import { applySearchAction } from './applySearchAction';
import { getAppliedFiltersFromQuery } from '../../../utils/getAppliedFiltersFromQuery';
import { changeFiltersLoadingStateAction } from './changeFiltersLoadingStateAction';
import { fetchFilters } from '../../../utils/data/fetchFilters';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const catalogInitAction = (query: ParsedUrlQueryInput): AppThunk => async (dispatch) => {
  dispatch(changeFiltersLoadingStateAction(true));
  const filters = await fetchFilters();
  const appliedFilters = getAppliedFiltersFromQuery(query, filters);
  const searchQuery = query.q as string;
  dispatch(updateFiltersAction(filters));
  dispatch(applyFiltersAction(appliedFilters));
  dispatch(applySearchAction(searchQuery));
  dispatch(changeFiltersLoadingStateAction(false));
  await dispatch(updateProductsAction({ appliedFilters, searchQuery }));
};
