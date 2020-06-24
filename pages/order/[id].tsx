import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { Layout } from '../../components/Layout/Layout';
import { AppDispatch, RootState } from '../../redux/types';
import { cancelOrderAction } from '../../redux/user/actions/cancelOrderAction';
import { NOT_FOUND_URL, ORDER_CANCELED_SUCCESSFULLY_MSG } from '../../contants/const';
import { orderStatusToString } from '../../utils/orderStatusToString';
import { OrderStatus } from '../../enums/OrderStatus';
import { OrderProductCard } from '../../components/OrderProductCard/OrderProductCard';
import { userApiService } from '../../services/userApiService';

type PropsFromRedux = ConnectedProps<typeof connector>;

export function OrderPage(
  {
    orders,
    cancelOrder,
    isGuest,
    isAdmin
  }: PropsFromRedux) {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [orderUser, setOrderUser] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [orders]);
  
  const loadOrder = async () => {
    if (orders) {
      let currentOrder;
      if (isAdmin) {
        currentOrder = await userApiService.getAnyOrder(id as string);
        const newOrderUser = await userApiService.getOrderUser(id as string);
        setOrderUser(newOrderUser);
      } else {
        currentOrder =
          orders.find(({ id: orderId }) => String(orderId) === id);
      }
      if (!currentOrder) {
        await router.push(NOT_FOUND_URL);
      } else {
        setOrder(currentOrder);
      }
    }
  };

  const handleCancelOrder = async () => {
    await userApiService.cancelOrder(order);
    cancelOrder(order);
    toast.success(ORDER_CANCELED_SUCCESSFULLY_MSG);
  };

  const handleChangeOrderStatus = async (status: OrderStatus) => {
    const result = await userApiService.updateOrderStatus(id as string, status);
    setOrder(result);
    router.reload();
  };

  if (isGuest) {
    return (
      <Layout>
        <p>Войдите, чтобы управлять заказом</p>
      </Layout>
    );
  }

  if (!order || (isAdmin && !orderUser)) {
    return <Layout><CircularProgress /></Layout>;
  }

  return (
    <Layout>
      <Typography gutterBottom variant="h5" component="h2">
        Заказ {order.id}
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        Статус: {orderStatusToString(order.status)}
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        Место доставки: {order.arrivalPoint}
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        Дата оформления заказа: {order.startDate.toLocaleDateString()}
      </Typography>
      {
        isAdmin &&
          <>
            <Typography gutterBottom variant="h5" component="h2">
              Имя пользователя: {orderUser.firstName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Фамилия пользователя: {orderUser.lastName}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Почта пользователя: {orderUser.email}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              Номер пользователя: {orderUser.phoneNumber}
            </Typography>
          </>
      }
      {
        order.completedDate &&
        <Typography gutterBottom variant="h5" component="h2">
          Дата выполнения заказа: {
          order.completedDate.toLocaleDateString()
        }
        </Typography>
      }
      {
        Boolean(order.description.length) &&
        <Typography variant="body2" color="textSecondary" component="p">
          Комментарий: {order.description}
        </Typography>
      }
      <Typography variant="body2" color="textSecondary" component="p">
        Сумма заказа: {
          order.price
        }
      </Typography>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        {
          order.products.map(product => {
            return (
              <Grid item key={product.id}>
                <OrderProductCard
                  amount={product.amountInOrder}
                  product={product}
                />
              </Grid>
            );
          })
        }
      </Grid>
      {
        (order.status === OrderStatus.REGISTRATION && !isAdmin) &&
        <Button onClick={handleCancelOrder}>Отменить заказ</Button>
      }
      {
        isAdmin &&
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              Изменить статус
            </Typography>
            <Button
              onClick={() => handleChangeOrderStatus(OrderStatus.REGISTRATION)}
            >
              В обработке
            </Button>
            <Button
              onClick={() => handleChangeOrderStatus(OrderStatus.DELIVERING)}
            >
              Доставляется
            </Button>
            <Button
              onClick={() => handleChangeOrderStatus(OrderStatus.COMPLETED)}
            >
              Доставлен
            </Button>
            <Button
              onClick={() => handleChangeOrderStatus(OrderStatus.CANCELED)}
            >
              Отменить заказ
            </Button>
          </div>
      }
    </Layout>
  );
}

const mapStateToProps = (state: RootState) => ({
  orders: state.user.orders,
  isGuest: state.user.isGuest,
  isAdmin: state.user.isAdmin
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  cancelOrder: (order) => dispatch(cancelOrderAction(order))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(OrderPage);