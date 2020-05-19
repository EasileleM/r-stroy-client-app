import { User } from '../../interfaces/User';
import { SignInData } from '../../interfaces/SignInData';
import { SignUpData } from '../../interfaces/SignUpData';
import { Product } from '../../interfaces/Product';
import { Order } from '../../interfaces/Order';
import { PersonalData } from '../../interfaces/PersonalData';
import { Credentials } from '../../interfaces/Credentials';

// AUTHORIZATION FLOW
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOGOUT = 'LOGOUT';

// USER COMMONS
export const INIT_USER = 'INIT_USER';
export const UPDATE_USER_PERSONAL_DATA = 'UPDATE_USER_PERSONAL_DATA';
export const UPDATE_USER_CREDENTIALS = 'UPDATE_USER_CREDENTIALS';

// CART
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART = 'UPDATE_CART';

// FAVORITES
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const UPDATE_FAVORITES = 'UPDATE_FAVORITES';

// ORDERS
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';

export interface UserState extends User {}

// AUTHORIZATION FLOW
export interface SignInAction {
  type: typeof SIGN_IN;
  payload: SignInData;
}

export interface SignUpAction {
  type: typeof SIGN_UP;
  payload: SignUpData;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

// CART
export interface UpdateCartAction {
  type: typeof UPDATE_CART;
  payload: Array<Product>;
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Product;
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: Product;
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
  payload: Order;
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

export interface UpdateUserCredentialsAction {
  type: typeof UPDATE_USER_CREDENTIALS;
  payload: Credentials;
}

export interface InitUserAction {
  type: typeof INIT_USER;
  payload: User;
}

export type UserActionTypes =
  SignInAction |
  SignUpAction |
  LogoutAction |
  InitUserAction |
  UpdateCartAction |
  UpdateFavoritesAction |
  UpdateOrdersAction |
  CreateOrderAction |
  CancelOrderAction |
  UpdateUserCredentialsAction |
  UpdateUserPersonalDataAction |
  AddToFavoritesAction |
  RemoveFromFavoritesAction |
  AddToCartAction |
  RemoveFromCartAction;