import { User } from '../interfaces/User';

// BREAKPOINTS
export const TABLET_SCREEN_SIZE: number = 1024;
export const MOBILE_SCREEN_SIZE: number = 900;

// NUMBER
export const CONTACT_NUMBER: string = '+7-961-648-38-00';
export const CONTACT_NUMBER_TO_COPY: string = '+79616483800';

// PAGE URLs
export const CATALOG_URL = '/catalog';
export const ERROR_URL = '/error';

// LOCAL STORAGE SERVICE
export const LOCAL_STORAGE_USER_KEY = 'user';

// USER
export const DEFAULT_USER: User = {
  isGuest: true,
  cartProducts: [],
  favoritesProducts: []
};