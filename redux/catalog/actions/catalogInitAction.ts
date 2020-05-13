import { ParsedUrlQueryInput } from 'querystring';
import { CATALOG_INIT } from '../interfaces';

export function catalogInitAction(query: ParsedUrlQueryInput) {
  return {
    type: CATALOG_INIT,
    payload: query
  };
}
