import { ParsedUrlQueryInput } from 'querystring';
import { Filters } from '../interfaces/Filters';

// eslint-disable-next-line max-len
export function clearQueryFromFilters(query: ParsedUrlQueryInput, initialFilters: Filters): ParsedUrlQueryInput {
  const result: ParsedUrlQueryInput = { ...query };
  Object.keys(initialFilters).forEach(filter => {
    delete result[filter];
  });
  return result;
}