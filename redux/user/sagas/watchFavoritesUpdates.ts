import { call, put, select, takeEvery } from '@redux-saga/core/effects';
import { ADD_TO_FAVORITES, AddToFavoritesAction, REMOVE_FROM_FAVORITES, RemoveFromFavoritesAction } from '../types';
import { updateFavoritesAction } from '../actions/updateFavoritesAction';
import { userApiService } from '../../../services/userApiService';
import { localStorageService } from '../../../services/localStorageService';

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
  const { user: {
    favoritesProducts,
    isGuest
  } } = yield select();

  const newFavoritesProducts = favoritesProducts.slice();

  const existingProductIndex = newFavoritesProducts
    .findIndex((item) => item.id === product.id);
  const newProduct = { ...product };

  if (type === ADD_TO_FAVORITES && existingProductIndex === -1) {
    newFavoritesProducts.push(newProduct);
  } else if (existingProductIndex !== -1) {
    newFavoritesProducts.splice(existingProductIndex, 1);
  }

  yield put(updateFavoritesAction(newFavoritesProducts));
  if (isGuest) {
    localStorageService.updateFavorites(newFavoritesProducts);
  } else {
    yield call(userApiService.patchFavorites, newFavoritesProducts);
  }
}