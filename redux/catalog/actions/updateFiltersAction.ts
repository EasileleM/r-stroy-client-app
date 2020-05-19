import { UPDATE_FILTERS, UpdateFiltersAction } from '../types';
import { Filters } from '../../../interfaces/Filters';

export function updateFiltersAction(filters: Filters): UpdateFiltersAction {
  return {
    type: UPDATE_FILTERS,
    payload: filters
  };
}
