import { User } from '../interfaces/User';
import { CartProduct } from '../interfaces/CartProduct';
import { Order } from '../interfaces/Order';
import { Product } from '../interfaces/Product';
import { sortOrders } from './sortOrders';

function mergeArrayOfItemsWithId<T extends Product | Order>(
  firstArray: Array<T>,
  secondArray: Array<T>
): Array<T> {
  const newArray = [...firstArray];
  for (const item of secondArray) {
    const isAlreadyAdded =
      Boolean(newArray.find(({ id }) => id === item.id));

    if (!isAlreadyAdded) {
      newArray.push(item);
    }
  }
  return newArray;
}

function mergeCarts(
  firstArray: Array<CartProduct>,
  secondArray: Array<CartProduct>
): Array<CartProduct> {
  const newArray = [...firstArray];
  for (const item of secondArray) {
    const existedItem = newArray.find(({ id }) => id === item.id);

    if (!existedItem) {
      newArray.push(item);
    } else {
      existedItem.amountInCart += item.amountInCart;
    }
  }
  return newArray;
}

export function mergeUsersData(remoteUser: User, localUser: User) {
  const newUser = { ...remoteUser };

  newUser.cartProducts = mergeCarts(
    remoteUser.cartProducts,
    localUser.cartProducts
  );

  newUser.favoritesProducts = mergeArrayOfItemsWithId(
    remoteUser.favoritesProducts,
    localUser.favoritesProducts
  );

  newUser.orders = sortOrders(mergeArrayOfItemsWithId(
    remoteUser.orders,
    localUser.orders
  ));

  return newUser;
}