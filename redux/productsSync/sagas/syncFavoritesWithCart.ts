import { put, select } from '@redux-saga/core/effects';
import { syncCartAction } from '../actions/syncCartAction';
import { arrayIncludesProduct } from '../../../utils/arrayIncludesProduct';

export function* syncFavoritesWithCart() {
  const {
    user: {
      cartProducts,
      favoritesProducts
    }
  } = yield select();

  const newCartProducts = cartProducts.map(product => {
    return {
      ...product,
      inFavorites: arrayIncludesProduct(favoritesProducts, product)
    };
  });

  yield put(syncCartAction(newCartProducts));
}