import { AppThunk } from '../../rootTypes';
import { CatalogActionTypes, UPDATE_FILTERS } from '../interfaces';
import { Filters } from '../../../interfaces/Filters';
import { fetchFilters } from '../../../dataFetching/fetchFilters';

function updateFiltersActionCreator(filters: Filters): CatalogActionTypes {
  return {
    type: UPDATE_FILTERS,
    payload: filters
  };
}

/**
 * Fetches filters
 */
export const updateFiltersAction = (): AppThunk => async (dispatch) => {
  const filters = await fetchFilters();
  dispatch(updateFiltersActionCreator(filters));
};
