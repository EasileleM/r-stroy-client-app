import { AppThunk } from '../../rootTypes';
import { CatalogActionTypes, UPDATE_FILTERS } from '../interfaces';
import { Filters } from '../../../interfaces/Filters';
import { fetchFilters } from '../../../utils/data/fetchFilters';

function updateFiltersActionCreator(filters: Filters): CatalogActionTypes {
  return {
    type: UPDATE_FILTERS,
    payload: filters
  };
}

/**
 * Fetches filters
 */
// eslint-disable-next-line max-len
export const updateFiltersAction = (): AppThunk<Promise<Filters>> => async (dispatch) => {
  const filters = await fetchFilters();
  await dispatch(updateFiltersActionCreator(filters));
  return filters;
};
