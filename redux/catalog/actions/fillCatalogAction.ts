import { ParsedUrlQueryInput } from 'querystring';
import { AppThunk } from '../../rootTypes';
import { updateProductsAction } from './updateProductsAction';
import { updateFiltersAction } from './updateFiltersAction';
import { queryInputToAppliedFilters } from '../../../utils/queryInputToAppliedFilters';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const fillCatalogAction = (query: ParsedUrlQueryInput): AppThunk => async (dispatch) => {
  const filters = await dispatch(updateFiltersAction());
  await dispatch(
    updateProductsAction(
      queryInputToAppliedFilters(query, filters),
      query.q as string
    )
  );
};
