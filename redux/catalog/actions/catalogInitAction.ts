import { CATALOG_INIT, CatalogActionTypes } from '../types';

export function catalogInitAction(): CatalogActionTypes {
  return {
    type: CATALOG_INIT,
  };
}
