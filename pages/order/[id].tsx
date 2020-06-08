import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import { Layout } from '../../components/Layout/Layout';
import { AppDispatch, RootState } from '../../redux/types';
import { cancelOrderAction } from '../../redux/user/actions/cancelOrderAction';
import { NOT_FOUND_URL, ORDER_CANCELED_SUCCESSFULLY, ORDERS_URL } from '../../contants/const';
import { orderStatusToString } from '../../utils/orderStatusToString';
import { OrderStatus } from '../../enums/OrderStatus';
import { OrderProductCard } from '../../components/OrderProductCard/OrderProductCard';

type PropsFromRedux = ConnectedProps<typeof connector>;

export function OrderPage({ orders, cancelOrder, isGuest }: PropsFromRedux) {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    if (orders) {
      const currentOrder = orders.find(({ id: orderId }) => orderId === id);
      if (!currentOrder) {
        router.push(NOT_FOUND_URL);
      } else {
        setOrder(currentOrder);
      }
    }
  }, [orders]);

  const handleCancelOrder = async () => {
    await router.push(ORDERS_URL);
    cancelOrder(order);
    toast.success(ORDER_CANCELED_SUCCESSFULLY);
  };

  if (isGuest) {
    return (
      <Layout>
        <p>Войдите, чтобы управлять заказом</p>
      </Layout>
    );
  }

  if (!order) {
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
        order.completedDate &&
        <Typography gutterBottom variant="h5" component="h2">
          Дата выполнения заказа: {
          order.completedDate.toLocaleDateString()
        }
        </Typography>
      }
      <Typography variant="body2" color="textSecondary" component="p">
        Комментарий: {order.description}
      </Typography>
      {
        (order.status === OrderStatus.registration) &&
        <Button onClick={handleCancelOrder}>Отменить заказ</Button>
      }
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
    </Layout>
  );
}

const mapStateToProps = (state: RootState) => ({
  orders: state.user.orders,
  isGuest: state.user.isGuest
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  cancelOrder: (order) => dispatch(cancelOrderAction(order))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(OrderPage);