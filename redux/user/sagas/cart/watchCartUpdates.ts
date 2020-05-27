import { put, select, takeEvery } from '@redux-saga/core/effects';
import { ADD_TO_CART, AddToCartAction, REMOVE_FROM_CART, RemoveFromCartAction } from '../../types';
import { updateCartAction } from '../../actions/updateCartAction';

export function* watchCartUpdates() {
  yield takeEvery([ADD_TO_CART, REMOVE_FROM_CART], cartUpdatesWorker);
}

function* cartUpdatesWorker({
  type,
  payload: product
}: AddToCartAction | RemoveFromCartAction) {
  const { cartProducts } = yield select((state) => state.user);
  const newCartProducts = cartProducts.slice();
  const productIndex = newCartProducts
    .findIndex((item) => item.id === product.id);
  const newProduct = { ...product };

  if (type === ADD_TO_CART) {
    if (!productIndex) {
      newProduct.inCart = true;
      newCartProducts.push(newProduct);
    }
  } else if (productIndex) {
    newCartProducts.splice(productIndex, 1);
  }
  
  yield put(updateCartAction(newCartProducts));
}