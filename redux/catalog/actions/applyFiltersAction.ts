import { Filters } from '../../../interfaces/Filters';
import { APPLY_FILTERS, ApplyFiltersAction } from '../types';

export function applyFiltersAction(
  appliedFilters: Filters
): ApplyFiltersAction {
  return {
    type: APPLY_FILTERS,
    payload: appliedFilters
  };
}
