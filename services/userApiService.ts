import axios from 'axios';
import { User } from '../interfaces/User';
import { SignUpData } from '../interfaces/SignUpData';
import { SignInData } from '../interfaces/SignInData';
import { Product } from '../interfaces/Product';
import { Order } from '../interfaces/Order';
import { PatchUserData } from '../interfaces/PatchUserData';
import { CreateOrderData } from '../interfaces/CreateOrderData';
import {
  ACTIVATE_USER_API_URL, ALL_ORDERS_API_URL,
  CART_API_URL, DEBOUNCE_TIMER,
  FAVORITES_API_URL,
  GET_USER_API_URL,
  LOGOUT_API_URL, NOTIFY_SUBSCRIBERS_API_URL,
  ORDERS_API_URL,
  SIGN_IN_API_URL,
  SIGN_UP_API_URL, SUBSCRIPTION_API_URL, UPDATE_USER_API_URL
} from '../contants/const';
import { serializeCartProducts } from '../serializers/serializeCartProducts';
import { CartProduct } from '../interfaces/CartProduct';
import { deserializeCartProducts } from '../deserializers/deserializeCartProducts';
import { serializeNewOrder } from '../serializers/serializeNewOrder';
import { deserializeOrders } from '../deserializers/deserializeOrders';
import { deserializeProducts } from '../deserializers/deserializeProducts';
import { debounceFunction } from '../utils/debounceFunction';
import { OrderStatus } from '../enums/OrderStatus';
import { PersonalData } from '../interfaces/PersonalData';

axios.defaults.withCredentials = true;

export class UserApiService {
  private lastPatchCartTaskCancellation = null;

  private lastPatchFavoritesTaskCancellation = null;

  /**
   * Fetches authorized user by GET request. Returns User data if user
   * has corresponding cookies. Returns null otherwise.
   */
  async getUser(): Promise<User> {
    try {
      const { data } = await axios.get(GET_USER_API_URL);
      const remoteUser: User = {
        personalData: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          isSubscribed: data.isSubscribed
        },
        orders: deserializeOrders(data.orders),
        cartProducts: deserializeCartProducts(data.cartProducts),
        favoritesProducts: deserializeProducts(data.favoritesProducts),
        isGuest: false,
        isAdmin: Boolean(data.roles) && data.roles.some(({ name }) => name === 'ROLE_ADMIN')
      };

      return remoteUser;
    } catch (e) {
      return null;
    }
  }

  async patchUserPersonalData(data: PatchUserData): Promise<void> {
    const requestData = { ...data };
    if (!requestData.newPassword) {
      delete requestData.newPassword;
    }
    return axios.patch(UPDATE_USER_API_URL, requestData);
  }

  patchCart = async (newCart: Array<CartProduct>): Promise<void> => {
    if (this.lastPatchCartTaskCancellation) {
      this.lastPatchCartTaskCancellation();
    }
    const requestFunction =
      () => axios.patch(CART_API_URL, serializeCartProducts(newCart));

    const {
      promise,
      cancelDelayedTask
    } = debounceFunction(requestFunction, DEBOUNCE_TIMER);
    this.lastPatchCartTaskCancellation = cancelDelayedTask;
    return promise;
  };

  patchFavorites = async (newFavorites: Array<Product>): Promise<void> => {
    if (this.lastPatchFavoritesTaskCancellation) {
      this.lastPatchFavoritesTaskCancellation();
    }
    const requestFunction =
      () => axios.patch(FAVORITES_API_URL, newFavorites);

    const {
      promise,
      cancelDelayedTask
    } = debounceFunction(requestFunction, DEBOUNCE_TIMER);
    this.lastPatchFavoritesTaskCancellation = cancelDelayedTask;
    return promise;
  };

  createOrder(newOrder: CreateOrderData): Promise<any> {
    return axios.post(ORDERS_API_URL, serializeNewOrder(newOrder));
  }

  async toggleSubscription(isSubscribed: boolean): Promise<void> {
    return axios.patch(`${SUBSCRIPTION_API_URL}?isSubscribed=${isSubscribed}`);
  }

  async cancelOrder(removedOrder: Order): Promise<void> {
    return axios.delete(`${ORDERS_API_URL}?id=${removedOrder.id}`);
  }

  async signIn(data: SignInData) {
    return axios.post(SIGN_IN_API_URL, data);
  }

  async signUp(data: SignUpData) {
    return axios.post(SIGN_UP_API_URL, data);
  }

  async logout() {
    return axios.post(LOGOUT_API_URL);
  }

  async activateUser(uuid: number): Promise<void> {
    await axios.post(`${ACTIVATE_USER_API_URL}/${uuid}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getAllOrders(page: number = 0, loadAll = false): Promise<any> {
    if (loadAll) {
      return axios.get(`${ALL_ORDERS_API_URL}?page=${page}`);
    }
    return axios.get(`${ALL_ORDERS_API_URL}/pageable?page=${page}`);
  }

  async getAnyOrder(id: string): Promise<Order> {
    const { data } = await axios.get(`${ALL_ORDERS_API_URL}/${id}`);
    return deserializeOrders([data])[0];
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    let orderStatus;
    switch(status) {
      case OrderStatus.REGISTRATION: orderStatus = 'REGISTRATION'; break;
      case OrderStatus.CANCELED: orderStatus = 'CANCELED'; break;
      case OrderStatus.COMPLETED: orderStatus = 'COMPLETED'; break;
      case OrderStatus.DELIVERING: orderStatus = 'DELIVERING'; break;
    }
    const { data } = await axios.patch(`${ALL_ORDERS_API_URL}/${id}`, { orderStatus });
    return deserializeOrders([data])[0];
  }

  async getOrderUser(id: string): Promise<PersonalData> {
    const { data } = await axios.get(`${ALL_ORDERS_API_URL}/${id}/user`);
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber
    };
  }

  async notifySubscribers(subject, message): Promise<void> {
    await axios.post(NOTIFY_SUBSCRIBERS_API_URL, { subject, message });
  }
}

export const userApiService = new UserApiService();