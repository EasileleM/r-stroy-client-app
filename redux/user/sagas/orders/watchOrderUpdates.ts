import { put, select, takeEvery } from '@redux-saga/core/effects';
import {
  CANCEL_ORDER,
  CancelOrderAction,
  CREATE_ORDER,
  CreateOrderAction
} from '../../types';
import { updateCartAction } from '../../actions/updateCartAction';

export function* watchOrdersUpdates() {
  yield takeEvery(
    [CREATE_ORDER, CANCEL_ORDER],
    ordersUpdatesWorker
  );
}

function* ordersUpdatesWorker({
  type,
  payload: order
}: CreateOrderAction | CancelOrderAction) {
  const { orders } = yield select((state) => state.user);
  const newOrders = orders.slice();


  yield put(updateCartAction(newOrders));
}