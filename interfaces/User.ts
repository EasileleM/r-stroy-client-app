import { Order } from './Order';
import { Product } from './Product';
import { PersonalData } from './PersonalData';

export interface User {
  isGuest: boolean;
  personalData?: PersonalData;
  login?: string;
  orders: Array<Order>;
  cartProducts: Array<Product>;
  favoritesProducts: Array<Product>;
}