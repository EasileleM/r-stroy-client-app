import { Filters } from '../../../interfaces/Filters';
import { APPLY_FILTERS, CatalogActionTypes } from '../interfaces';

// eslint-disable-next-line max-len
export function applyFiltersAction(appliedFilters: Filters): CatalogActionTypes {
  return {
    type: APPLY_FILTERS,
    payload: appliedFilters
  };
}
