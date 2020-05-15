import { Filters } from '../interfaces/Filters';

/**
 * Converts appliedFilters to
 * URLSearchParams, removing filters with default values.
 *
 * @param appliedFilters
 * @param initialFilters
 */
export function appliedFiltersToURLSearchParams(
  appliedFilters: Filters, initialFilters: Filters
): URLSearchParams {
  const result: URLSearchParams = new URLSearchParams();

  if (appliedFilters.lowestPrice !== initialFilters.lowestPrice) {
    result.append('lowestPrice', String(appliedFilters.lowestPrice));
  }

  if (appliedFilters.highestPrice !== initialFilters.highestPrice) {
    result.append('highestPrice', String(appliedFilters.highestPrice));
  }

  if (appliedFilters.types && appliedFilters.types.length) {
    for (const type of appliedFilters.types) {
      result.append('types', type);
    }
  }

  return result;
}