import { CATALOG_ERROR, CatalogActionTypes } from '../types';

export function catalogErrorAction(hasError): CatalogActionTypes {
  return {
    type: CATALOG_ERROR,
    payload: hasError
  };
}