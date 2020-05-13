import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../interfaces/Filters';

/**
 * Clears given query from initialFilters keys.
 *
 * @param query
 * @param initialFilters
 * @return cleared query
 */
export function clearQueryFromFilters(
  query: ParsedUrlQueryInput, initialFilters: Filters
): ParsedUrlQueryInput {
  const result: ParsedUrlQueryInput = { ...query };
  Object.keys(initialFilters).forEach(filter => {
    delete result[filter];
  });
  return result;
}