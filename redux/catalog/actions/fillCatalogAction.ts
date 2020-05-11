import { ParsedUrlQueryInput } from 'querystring';
import { AppThunk } from '../../rootTypes';
import { updateProductsAction } from './updateProductsAction';
import { updateFiltersAction } from './updateFiltersAction';
import { QueryInputToAppliedFilters } from '../../../utils/QueryInputToAppliedFilters';

/**
 * Fills catalog with products and filters
 */
// eslint-disable-next-line max-len
export const fillCatalogAction = (query: ParsedUrlQueryInput): AppThunk => async (dispatch) => {
  dispatch(updateFiltersAction()).then((filters) => {
    dispatch(
      updateProductsAction(
        QueryInputToAppliedFilters(query, filters),
        query.q as string
      )
    );
  });
};
