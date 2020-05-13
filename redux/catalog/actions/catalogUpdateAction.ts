import { CATALOG_UPDATE } from '../interfaces';

export function catalogUpdateAction(appliedFilters, searchQuery, router) {
  return {
    type: CATALOG_UPDATE,
    payload: {
      appliedFilters,
      searchQuery,
      router
    }
  };
}
