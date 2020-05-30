import { put, select } from '@redux-saga/core/effects';
import { syncCatalogAction } from '../actions/syncCatalogAction';
import { arrayIncludesProduct } from '../../../utils/arrayIncludesProduct';

export function* syncFavoritesWithCatalog() {
  const {
    catalog: { products: catalogProducts },
    user: {
      favoritesProducts
    }
  } = yield select();

  const newCatalogProducts = catalogProducts.map(product => {
    return {
      ...product,
      inFavorites: arrayIncludesProduct(favoritesProducts, product)
    };
  });

  yield put(syncCatalogAction(newCatalogProducts));
}