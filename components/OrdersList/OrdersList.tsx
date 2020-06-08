import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

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