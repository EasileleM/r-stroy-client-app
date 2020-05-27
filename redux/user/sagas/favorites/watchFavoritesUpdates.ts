import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ADD_TO_FAVORITES, AddToFavoritesAction, REMOVE_FROM_FAVORITES, RemoveFromFavoritesAction } from '../../types';
import { updateFavoritesAction } from '../../actions/updateFavoritesAction';

export function* watchFavoritesUpdates() {
  yield takeEvery(
    [ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES],
    favoritesUpdatesWorker
  );
}

function* favoritesUpdatesWorker({
  type,
  payload: product
}: AddToFavoritesAction | RemoveFromFavoritesAction) {
  const { favoritesProducts } = yield select((state) => state.user);
  const newFavoritesProducts = favoritesProducts.slice();
  const productIndex = newFavoritesProducts
    .findIndex((item) => item.id === product.id);
  const newProduct = { ...product };

  if (type === ADD_TO_FAVORITES) {
    if (!productIndex) {
      newProduct.inFavorites = true;
      newFavoritesProducts.push(newProduct);
    }
  } else if (productIndex) {
    newFavoritesProducts.splice(productIndex, 1);
  }

  yield put(updateFavoritesAction(newFavoritesProducts));
}