import {
  INIT_USER,
  SET_CREDENTIALS_UPDATE_ERROR,
  SET_CREDENTIALS_UPDATE_STATE,
  SET_PERSONAL_DATA_UPDATE_ERROR,
  SET_PERSONAL_DATA_UPDATE_STATE,
  SET_USER_CREDENTIALS,
  SET_USER_PERSONAL_DATA,
  UPDATE_CART,
  UPDATE_FAVORITES,
  UPDATE_ORDERS,
  UserActionTypes,
  UserState
} from './types';
import { DEFAULT_USER } from '../../contants/const';

const initialState: UserState = {
  ...DEFAULT_USER,
  isPersonalDataUpdates: false,
  personalDataUpdateError: null,
  areCredentialsUpdate: false,
  credentialsUpdateError: null
};

export function userReducer(
  state: UserState = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        ...action.payload
      };
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
    case SET_PERSONAL_DATA_UPDATE_STATE:
      return {
        ...state,
        isPersonalDataUpdates: action.payload
      };
    case SET_PERSONAL_DATA_UPDATE_ERROR:
      return {
        ...state,
        personalDataUpdateError: action.payload
      };
    case SET_CREDENTIALS_UPDATE_STATE:
      return {
        ...state,
        areCredentialsUpdate: action.payload
      };
    case SET_CREDENTIALS_UPDATE_ERROR:
      return {
        ...state,
        credentialsUpdateError: action.payload
      };
    case SET_USER_CREDENTIALS:
      return {
        ...state,
        credentials: action.payload
      };
    case SET_USER_PERSONAL_DATA:
      return {
        ...state,
        personalData: action.payload
      };
    default:
      return state;
  }
}
