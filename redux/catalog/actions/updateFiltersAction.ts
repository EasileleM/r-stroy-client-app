import { CatalogActionTypes, UPDATE_FILTERS } from '../interfaces';
import { Filters } from '../../../interfaces/Filters';

export function updateFiltersAction(filters: Filters): CatalogActionTypes {
  return {
    type: UPDATE_FILTERS,
    payload: filters
  };
}
