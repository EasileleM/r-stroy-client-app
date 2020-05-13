import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../interfaces/Filters';

/**
 * Returns filters parsed from given query
 *
 * @param query
 * @param initialFilters
 */
export function getAppliedFiltersFromQuery(
  query: ParsedUrlQueryInput, initialFilters: Filters
): Filters {
  const result: Filters = {
    ...initialFilters,
    types: []
  };
  if (query.lowestPrice) {
    result.lowestPrice = Number(query.lowestPrice);
  }
  if (query.highestPrice) {
    result.highestPrice = Number(query.highestPrice);
  }
  if (query.types) {
    if (Array.isArray(query.types) && query.types.length) {
      result.types = query.types as string[];
    } else {
      result.types = [query.types as string];
    }
  }
  return result;
}