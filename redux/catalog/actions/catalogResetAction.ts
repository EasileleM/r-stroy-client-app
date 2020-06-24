import { CATALOG_RESET, CatalogResetAction } from '../types';

export function catalogResetAction(): CatalogResetAction {
  return {
    type: CATALOG_RESET
  };
}
