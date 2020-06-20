import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import Typography from '@material-ui/core/Typography';
import { RootState } from '../../redux/types';
import { OrderCard } from '../OrderCard/OrderCard';

export interface OrdersListProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = OrdersListProps & PropsFromRedux;

export function OrdersList(
  {
    className,
    isGuest,
    orders
  }: Props
) {

  if (isGuest) {
    return (
      <p>Войдите, чтобы управлять заказами</p>
    );
  }

  return (
    <div className={cn(className)}>
      <Typography gutterBottom component="h1" variant="h1">
        Ваши заказы
      </Typography>
      {
        !orders.length &&
        <Typography component="h1" variant="h5">
          У вас нет заказов!
        </Typography>
      }
      {
        orders.map(order => <OrderCard key={order.id} data={order} />)
      }
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isGuest: state.user.isGuest,
  orders: state.user.orders
});

const connector = connect(mapStateToProps);

export default connector(OrdersList);