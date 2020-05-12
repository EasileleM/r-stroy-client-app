import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../interfaces/Filters';

// eslint-disable-next-line max-len
export function queryInputToAppliedFilters(query: ParsedUrlQueryInput, initialFilters: Filters): Filters {
  const result: Filters = {
    types: [],
    highestPrice: initialFilters.highestPrice,
    lowestPrice: initialFilters.lowestPrice
  };

  if (
    query.lowestPrice
    && (query.lowestPrice !== initialFilters.lowestPrice)
  ) {
    result.lowestPrice = Number(query.lowestPrice);
  }
  if (
    query.highestPrice
    && (query.highestPrice !== initialFilters.highestPrice)
  ) {
    result.highestPrice = Number(query.highestPrice);
  }
  if (query.types) {
    if (typeof query.types === 'object') {
      if (query.types.length) {
        result.types = query.types as string[];
      }
    } else {
      result.types = [query.types as string];
    }
  }
  return result;
}