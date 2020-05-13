import { CATALOG_UPDATE } from '../types';

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
