import { CATALOG_UPDATE, CatalogActionTypes } from '../types';

export function catalogUpdateAction(
  appliedFilters, searchQuery
): CatalogActionTypes {
  return {
    type: CATALOG_UPDATE,
    payload: {
      appliedFilters,
      searchQuery
    }
  };
}
