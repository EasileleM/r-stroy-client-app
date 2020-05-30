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

// MESSAGES TO USER
export const NUMBER_COPIED_MSG = 'Номер скопирован в буфер обмена';
export const CART_MAX_PRODUCT_AMOUNT_MSG = 'В вашей корзине содержится максимальное количество данного товара!';
export const CART_PRODUCT_ADDED_MSG = 'Добавлено в корзину!';