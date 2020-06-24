import { User } from '../interfaces/User';
import { CartProduct } from '../interfaces/CartProduct';
import { Order } from '../interfaces/Order';
import { Product } from '../interfaces/Product';

function mergeFavorites<T extends Product | Order>(
  remoteFavorites: Array<T>,
  localFavorites: Array<T>
): Array<T> {
  const newArray = [...remoteFavorites];
  for (const item of localFavorites) {
    const isAlreadyAdded =
      Boolean(newArray.find(({ id }) => id === item.id));

    if (!isAlreadyAdded) {
      newArray.push(item);
    }
  }
  return newArray;
}

function mergeCarts(
  remoteCart: Array<CartProduct>,
  localCart: Array<CartProduct>
): Array<CartProduct> {
  const newArray = [...remoteCart];
  for (const item of localCart) {
    const existedItem = newArray.find(({ id }) => id === item.id);

    if (!existedItem) {
      newArray.push(item);
    } else {
      const newAmount = existedItem.amountInCart + item.amountInCart;
      existedItem.amountInCart = Math.min(newAmount, existedItem.amount);
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

  newUser.favoritesProducts = mergeFavorites(
    remoteUser.favoritesProducts,
    localUser.favoritesProducts
  );

  return newUser;
}