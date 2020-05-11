import { Product } from '../../interfaces/Product';

export const FILL_CATALOG = 'FILL_CATALOG';

export interface CatalogState {
  products: Array<Product>;
}

interface FillCatalogAction {
  type: typeof FILL_CATALOG;
  payload: Array<Product>;
}

export type CatalogActionTypes = FillCatalogAction;