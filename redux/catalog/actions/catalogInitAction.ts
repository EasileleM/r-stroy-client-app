import { ParsedUrlQueryInput } from 'querystring';
import { CATALOG_INIT } from '../types';

export function catalogInitAction(query: ParsedUrlQueryInput) {
  return {
    type: CATALOG_INIT,
    payload: query
  };
}
