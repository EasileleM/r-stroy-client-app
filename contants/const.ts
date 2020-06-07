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
export const PROFILE_URL = '/profile';
export const CREATE_ORDER_URL = '/createOrder';
export const INDEX_URL = '/';

// LOCAL STORAGE SERVICE
export const LOCAL_STORAGE_USER_KEY = 'user';

// USER
export const DEFAULT_USER: User = {
  isGuest: true,
  cartProducts: [],
  favoritesProducts: []
};

// REGEX
export const PASSWORD_REGEX = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
export const NUMBER_REGEX = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';

// MESSAGES TO USER
export const NUMBER_COPIED_MSG = 'Номер скопирован в буфер обмена';
export const CART_MAX_PRODUCT_AMOUNT_MSG = 'В вашей корзине содержится максимальное количество данного товара!';
export const CART_PRODUCT_ADDED_MSG = 'Добавлено в корзину!';
export const FAVORITES_EMPTY_MSG = 'Вы не добавили ни одного избранного товара!';
export const CART_EMPTY_MSG = 'Корзина пуста!';
export const USER_CHANGED_SUCCESSFULLY = 'Ваш профиль успешно изменен!';