import { Order } from './Order';
import { Product } from './Product';
import { PersonalData } from './PersonalData';
import { Credentials } from './Credentials';

export interface User {
  isGuest: boolean;
  personalData?: PersonalData;
  credentials?: Credentials;
  orders: Array<Order>;
  cartProducts: Array<Product>;
  favoritesProducts: Array<Product>;
}