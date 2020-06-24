import { User } from '../../interfaces/User';
import { Product } from '../../interfaces/Product';
import { Order } from '../../interfaces/Order';
import { PersonalData } from '../../interfaces/PersonalData';
import { CartProduct } from '../../interfaces/CartProduct';
import { CreateOrderData } from '../../interfaces/CreateOrderData';

// AUTHORIZATION FLOW
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const LOGOUT = 'LOGOUT';

// USER COMMONS
export const INIT_USER = 'INIT_USER';
export const UPDATE_USER_PERSONAL_DATA = 'UPDATE_USER_PERSONAL_DATA';

// CART
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_CART_PRODUCT_AMOUNT = 'CHANGE_CART_PRODUCT_AMOUNT';
export const UPDATE_CART = 'UPDATE_CART';
export const CLEAN_CART = 'CLEAN_CART';

// FAVORITES
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

// ORDERS
export const UPDATE_ORDERS = 'UPDATE_ORDERS';
export const CREATE_ORDER = 'CREATE_ORDER';
export const CANCEL_ORDER = 'CANCEL_ORDER';

export interface UserState extends User {}

// AUTHORIZATION FLOW
export interface InitUserAction {
  type: typeof INIT_USER;
  payload: User;
}

export interface AuthorizeUserAction {
  type: typeof AUTHORIZE_USER;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

// CART
export interface UpdateCartAction {
  type: typeof UPDATE_CART;
  payload: Array<CartProduct>;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartProduct;
}

export interface ChangeCartProductAmountAction {
  type: typeof CHANGE_CART_PRODUCT_AMOUNT;
  payload: CartProduct;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: CartProduct;
}

export interface CleanCartAction {
  type: typeof CLEAN_CART;
}

// FAVORITES
export interface UpdateFavoritesAction {
  type: typeof UPDATE_FAVORITES;
  payload: Array<Product>;
}

export interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: Product;
}

export interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: Product;
}

// ORDERS
export interface UpdateOrdersAction {
  type: typeof UPDATE_ORDERS;
  payload: Array<Order>;
}

export interface CreateOrderAction {
  type: typeof CREATE_ORDER;
  payload: CreateOrderData;
}

export interface CancelOrderAction {
  type: typeof CANCEL_ORDER;
  payload: Order;
}

// USER COMMONS
export interface UpdateUserPersonalDataAction {
  type: typeof UPDATE_USER_PERSONAL_DATA;
  payload: PersonalData;
}

export type UserActionTypes =
  AuthorizeUserAction |
  LogoutAction |
  InitUserAction |
  UpdateCartAction |
  UpdateFavoritesAction |
  UpdateOrdersAction |
  UpdateUserPersonalDataAction |
  AddToFavoritesAction |
  RemoveFromFavoritesAction |
  AddToCartAction |
  RemoveFromCartAction |
  ChangeCartProductAmountAction |
  CleanCartAction |
  CreateOrderAction |
  CancelOrderAction;