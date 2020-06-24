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
export const NOT_FOUND_URL = '/404';
export const PROFILE_URL = '/profile';
export const CREATE_ORDER_URL = '/createOrder';
export const ORDERS_URL = '/orders';
export const INDEX_URL = '/';
export const CREATE_PRODUCT_URL = '/product/create';
export const PRODUCT_TYPE_URL = '/product/types';

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
export const CART_PRODUCT_OUT_OF_STOCK_MSG = 'Данного товара нет в наличии!';
export const CART_PRODUCT_ADDED_MSG = 'Добавлено в корзину!';
export const FAVORITES_EMPTY_MSG = 'Вы не добавили ни одного избранного товара!';
export const CART_EMPTY_MSG = 'Корзина пуста!';
export const USER_CHANGED_SUCCESSFULLY_MSG = 'Ваш профиль успешно изменен!';
export const ORDER_CANCELED_SUCCESSFULLY_MSG = 'Ваш заказ успешно отменен!';
export const CANCELED_SUBSCRIPTION_SUCCESSFULLY_MSG = 'Вы отписались от рассылки!';
export const ORDERED_SUBSCRIPTION_SUCCESSFULLY_MSG = 'Вы подписались на рассылку!';

// API
export const GET_FILTERS_API_URL = 'http://localhost:3033/api/v1/commons/products/filters';
export const GET_PRODUCTS_API_URL = 'http://localhost:3033/api/v1/commons/products';
export const GET_PRODUCT_API_URL = 'http://localhost:3033/api/v1/commons/products';
export const SIGN_IN_API_URL = 'http://localhost:3033/api/v1/commons/auth/login';
export const LOGOUT_API_URL = 'http://localhost:3033/api/v1/commons/auth/logout';
export const SIGN_UP_API_URL = 'http://localhost:3033/api/v1/commons/auth/registration';
export const GET_USER_API_URL = 'http://localhost:3033/api/v1/commons/user';
export const UPDATE_USER_API_URL = 'http://localhost:3033/api/v1/commons/user';
export const FAVORITES_API_URL = 'http://localhost:3033/api/v1/commons/user/favorites';
export const CART_API_URL = 'http://localhost:3033/api/v1/commons/user/cart';
export const ORDERS_API_URL = 'http://localhost:3033/api/v1/commons/user/orders';
export const SUBSCRIPTION_API_URL = 'http://localhost:3033/api/v1/commons/user/subscription';
export const PRODUCT_TYPES_API_URL = 'http://localhost:3033/api/v1/admin/productTypes';
export const UPDATE_PRODUCT_API_URL = 'http://localhost:3033/api/v1/admin/products';
export const CREATE_PRODUCT_API_URL = 'http://localhost:3033/api/v1/admin/products';
export const ACTIVATE_USER_API_URL = 'http://localhost:3033/api/v1/commons/user/activate';

// TIMERS
export const DEBOUNCE_TIMER = 2000;