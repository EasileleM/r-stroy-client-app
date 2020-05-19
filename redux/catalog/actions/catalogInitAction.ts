import { CATALOG_INIT, CatalogInitAction } from '../types';

export function catalogInitAction(): CatalogInitAction {
  return {
    type: CATALOG_INIT,
  };
}
