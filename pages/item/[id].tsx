import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import { AppDispatch, RootState } from '../../redux/types';
import { cancelOrderAction } from '../../redux/user/actions/cancelOrderAction';

type PropsFromRedux = ConnectedProps<typeof connector>;

export function OrderPage({ orders, cancelOrder, isGuest }: PropsFromRedux) {
  return (
    <Layout>
      s
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