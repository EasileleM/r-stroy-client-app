import { CATALOG_RESET, CatalogActionTypes } from '../types';

export function catalogResetAction(): CatalogActionTypes {
  return {
    type: CATALOG_RESET
  };
}
