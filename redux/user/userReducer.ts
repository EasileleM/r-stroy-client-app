import {
  INIT_USER,
  UPDATE_CART,
  UPDATE_FAVORITES,
  UPDATE_ORDERS,
  UPDATE_USER_PERSONAL_DATA,
  UserActionTypes,
  UserState
} from './types';
import { DEFAULT_USER } from '../../contants/const';

const initialState: UserState = DEFAULT_USER;

export function userReducer(
  state: UserState = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case INIT_USER:
      return action.payload;
    case UPDATE_CART:
      return {
        ...state,
        cartProducts: action.payload
      };
    case UPDATE_FAVORITES:
      return {
        ...state,
        favoritesProducts: action.payload
      };
    case UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case UPDATE_USER_PERSONAL_DATA:
      return {
        ...state,
        personalData: action.payload
      };
    default:
      return state;
  }
}
