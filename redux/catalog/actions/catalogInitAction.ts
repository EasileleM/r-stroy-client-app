import { ParsedUrlQueryInput } from 'querystring';
import { CATALOG_INIT, CatalogActionTypes } from '../types';

export function catalogInitAction(
  query: ParsedUrlQueryInput
): CatalogActionTypes {
  return {
    type: CATALOG_INIT,
    payload: query
  };
}
