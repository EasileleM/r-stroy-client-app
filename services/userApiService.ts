import axios from 'axios';
import { User } from '../interfaces/User';
import { SignUpData } from '../interfaces/SignUpData';
import { SignInData } from '../interfaces/SignInData';
import { Product } from '../interfaces/Product';
import { Order } from '../interfaces/Order';
import { PatchUserData } from '../interfaces/PatchUserData';
import { CreateOrderData } from '../interfaces/CreateOrderData';
import { CART_URL, FAVORITES_URL, GET_USER_URL, LOGOUT_URL, SIGN_IN_URL, SIGN_UP_URL } from '../contants/const';
import { serializeCartProducts } from '../serializers/serializeCartProducts';
import { CartProduct } from '../interfaces/CartProduct';
import { deserializeCartProducts } from '../deserializers/deserializeCartProducts';

axios.defaults.withCredentials = true;

export class UserApiService {
  /**
   * Fetches authorized user by GET request. Returns User data if user
   * has corresponding cookies. Returns null otherwise.
   */
  async getUser(): Promise<User> {
    try {
      const { data } = await axios.get(GET_USER_URL);
      return {
        personalData: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber
        },
        orders: data.orders,
        cartProducts: deserializeCartProducts(data.cartProducts),
        favoritesProducts: data.favoritesProducts,
        isGuest: false
      };
    } catch (e) {
      return null;
    }
  }

  async patchUserPersonalData(data: PatchUserData): Promise<void> {
    return Promise.resolve();
  }

  async patchCart(newCart: Array<CartProduct>): Promise<void> {
    return axios.patch(CART_URL, serializeCartProducts(newCart));
  }

  async patchFavorites(newFavorites: Array<Product>): Promise<void> {
    return axios.patch(FAVORITES_URL, newFavorites);
  }

  async createOrder(newOrder: CreateOrderData): Promise<string> {
    return Promise.resolve('tempId');
  }

  async cancelOrder(newOrder: Order): Promise<void> {
    return Promise.resolve();
  }

  async getOrders(): Promise<void> {
    return Promise.resolve();
  }

  async signIn(data: SignInData) {
    return axios.post(SIGN_IN_URL, data);
  }

  async signUp(data: SignUpData) {
    return axios.post(SIGN_UP_URL, data);
  }

  async logout() {
    return axios.post(LOGOUT_URL);
  }
}

export const userApiService = new UserApiService();