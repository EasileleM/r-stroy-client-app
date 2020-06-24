import { Product } from '../../../interfaces/Product';
import { SYNC_CATALOG, SyncCatalogAction } from '../types';

export function syncCatalogAction(
  newCatalogProducts: Array<Product>
): SyncCatalogAction {
  return {
    type: SYNC_CATALOG,
    payload: newCatalogProducts
  };
}