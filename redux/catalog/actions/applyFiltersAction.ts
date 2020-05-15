import { Filters } from '../../../interfaces/Filters';
import { APPLY_FILTERS, CatalogActionTypes } from '../types';

export function applyFiltersAction(
  appliedFilters: Filters
): CatalogActionTypes {
  return {
    type: APPLY_FILTERS,
    payload: appliedFilters
  };
}
