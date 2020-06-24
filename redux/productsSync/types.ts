import { Product } from '../../interfaces/Product';
import { Order } from '../../interfaces/Order';
import { CartProduct } from '../../interfaces/CartProduct';

export const SYNC_CART = 'SYNC_CART';
export const SYNC_FAVORITES = 'SYNC_FAVORITES';
export const SYNC_CATALOG = 'SYNC_CATALOG';
export const SYNC_ORDERS = 'SYNC_ORDERS';

export interface SyncCartAction {
  type: typeof SYNC_CART;
  payload: Array<CartProduct>;
}

export interface SyncFavoritesAction {
  type: typeof SYNC_FAVORITES;
  payload: Array<Product>;
}

export interface SyncCatalogAction {
  type: typeof SYNC_CATALOG;
  payload: Array<Product>;
}

export interface SyncOrdersAction {
  type: typeof SYNC_ORDERS;
  payload: Array<Order>;
}

export type SyncActionTypes =
  SyncCartAction |
  SyncOrdersAction |
  SyncFavoritesAction |
  SyncCatalogAction;