import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Pagination from '@material-ui/lab/Pagination';
import { RootState } from '../../redux/types';
import { OrderCard } from '../OrderCard/OrderCard';
import { sortOrders } from '../../utils/sortOrders';
import { INDEX_URL } from '../../contants/const';
import { userApiService } from '../../services/userApiService';
import { deserializeOrders } from '../../deserializers/deserializeOrders';

type PropsFromRedux = ConnectedProps<typeof connector>;
export function AdminOrderList({ isAdmin }: PropsFromRedux) {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPageAmount, setMaxPageAmount] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push(INDEX_URL);
    }
  }, [isAdmin]);
  
  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    const { data } = await userApiService.getAllOrders(currentPage);
    setMaxPageAmount(data.totalPages);
    setOrders(deserializeOrders(data.content));
  };

  const handlePageChange = async (e, page) => {
    setCurrentPage(page);
    await loadAllOrders();
  };

  return (
    <div>
      <Typography gutterBottom component="h1" variant="h1">
        Заказы
      </Typography>
      {
        !orders.length &&
        <Typography component="h1" variant="h5">
          Нет заказов!
        </Typography>
      }
      {
        sortOrders(orders)
          .map(order => <OrderCard key={order.id} data={order} />)
      }
      {
        maxPageAmount > 1 &&
        <Pagination
          count={maxPageAmount}
          page={currentPage}
          onChange={handlePageChange}
        />
      }
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const connector = connect(mapStateToProps);

export default connector(AdminOrderList);