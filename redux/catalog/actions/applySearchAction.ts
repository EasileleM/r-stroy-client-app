import { APPLY_SEARCH, CatalogActionTypes } from '../interfaces';


// eslint-disable-next-line max-len
export function applySearchAction(searchQuery: string): CatalogActionTypes {
  return {
    type: APPLY_SEARCH,
    payload: searchQuery
  };
}
