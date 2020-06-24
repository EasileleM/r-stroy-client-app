import { APPLY_SEARCH, ApplySearchAction } from '../types';

export function applySearchAction(
  searchQuery: string
): ApplySearchAction {
  return {
    type: APPLY_SEARCH,
    payload: searchQuery
  };
}
