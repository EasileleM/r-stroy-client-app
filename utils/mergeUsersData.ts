import { User } from '../interfaces/User';

function mergeArrayOfItemsWithId(firstArray, secondArray) {
  const newArray = [...firstArray];
  for (const item of secondArray) {
    const isAlreadyAdded = Boolean(newArray.find(({ id }) => id === item.id));

    if (!isAlreadyAdded) {
      newArray.push(item);
    }
  }
  return newArray;
}

export function mergeUsersData(remoteUser: User, localUser: User) {
  const newUser = { ...remoteUser };

  newUser.cartProducts = mergeArrayOfItemsWithId(
    remoteUser.cartProducts,
    localUser.cartProducts
  );

  newUser.favoritesProducts = mergeArrayOfItemsWithId(
    remoteUser.favoritesProducts,
    localUser.favoritesProducts
  );

  // TODO sort orders somehow
  newUser.orders = mergeArrayOfItemsWithId(
    remoteUser.orders,
    localUser.orders
  );

  return newUser;
}