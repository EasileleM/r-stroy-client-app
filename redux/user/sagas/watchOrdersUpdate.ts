import { put, select, takeEvery } from '@redux-saga/core/effects';
import { CANCEL_ORDER, CancelOrderAction, CREATE_ORDER, CreateOrderAction } from '../types';
import { OrderStatus } from '../../../enums/OrderStatus';
import { updateOrdersAction } from '../actions/updateOrdersAction';

export function* watchOrdersUpdate() {
  yield takeEvery(
    [CREATE_ORDER, CANCEL_ORDER],
    updateOrderWorker
  );
}

function* updateOrderWorker({
  type,
  payload
}: CreateOrderAction | CancelOrderAction) {
  const {
    user: {
      orders
    }
  } = yield select();

  const newOrders = [...orders];

  if (type === CREATE_ORDER) {
    const createdOrder = {
      ...payload,
      status: OrderStatus.REGISTRATION,
      startDate: new Date(),
      completedDate: null
    };

    newOrders.push(createdOrder);
  } else if (type === CANCEL_ORDER) {
    newOrders.splice(newOrders.findIndex(({ id }) => id === payload.id), 1);
  }
  
  yield put(updateOrdersAction(newOrders));
}