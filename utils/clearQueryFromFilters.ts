import { Filters } from '../interfaces/Filters';

/**
 * Clears given query from initialFilters keys.
 *
 * @param query
 * @param initialFilters
 * @return cleared query
 */
export function clearQueryFromFilters(
  query: URLSearchParams, initialFilters: Filters
): URLSearchParams {
  const newQuery = new URLSearchParams(query);
  Object.keys(initialFilters).forEach(filter => {
    newQuery.delete(filter);
  });
  return newQuery;
}