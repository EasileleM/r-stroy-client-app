import { Order } from './Order';
import { Product } from './Product';
import { PersonalData } from './PersonalData';
import { CartProduct } from './CartProduct';

export interface User {
  isGuest: boolean;
  isAdmin?: boolean;
  personalData?: PersonalData;
  orders?: Array<Order>;
  cartProducts: Array<CartProduct>;
  favoritesProducts: Array<Product>;
}