import { APPLY_SEARCH, CatalogActionTypes } from '../types';

export function applySearchAction(
  searchQuery: string
): CatalogActionTypes {
  return {
    type: APPLY_SEARCH,
    payload: searchQuery
  };
}
