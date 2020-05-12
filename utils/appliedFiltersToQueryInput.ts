import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../interfaces/Filters';

// eslint-disable-next-line max-len
export function appliedFiltersToQueryInput(appliedFilters: Filters, initialFilters: Filters): ParsedUrlQueryInput {
  const result: ParsedUrlQueryInput = {};
  if (appliedFilters.lowestPrice !== initialFilters.lowestPrice) {
    result.lowestPrice = appliedFilters.lowestPrice;
  }
  if (appliedFilters.highestPrice !== initialFilters.highestPrice) {
    result.highestPrice = appliedFilters.highestPrice;
  }
  if (appliedFilters.types && appliedFilters.types.length) {
    result.types = appliedFilters.types;
  }
  return result;
}