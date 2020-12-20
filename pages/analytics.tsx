import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import { connect, ConnectedProps } from 'react-redux';
import { Layout } from '../components/Layout/Layout';
import { RootState } from '../redux/types';
import { userApiService } from '../services/userApiService';
import { deserializeOrders } from '../deserializers/deserializeOrders';
import { INDEX_URL } from '../contants/const';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = {
    parent: {
        fontSize: '4px'
    },
}

const wrapperStyles = {
    width: '500px',
    height: '500px'
}

export function NotifyPage({ isAdmin }: PropsFromRedux) {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const loadAllOrders = async () => {
    const { data } = await userApiService.getAllOrders(0, true);
    setOrders(deserializeOrders(data));
  };

  useEffect(() => {
    if (!isAdmin) {
      router.push(INDEX_URL);
    }
  }, []);

  useEffect(() => {
    loadAllOrders();
  }, []);

    const data = React.useMemo(
        () => {
            const data = Object.entries(orders.reduce((labels, order) => {
                const dateLabel = new Date(order.startDate).toDateString();
                labels[dateLabel] = labels[dateLabel] ? labels[dateLabel] + 1 : 1;
                return labels;
            }, {}));
            const result = data.map(([key, val]) => { return { x: new Date(key), y: val } });
            return result;
        },
        [orders]
      );

    const priceData = React.useMemo(
        () => {
            const data = Object.entries(orders.reduce((labels, order) => {
                const dateLabel = new Date(order.startDate).toDateString();
                labels[dateLabel] = labels[dateLabel] ? labels[dateLabel] + Number(order.price) : Number(order.price);
                return labels;
            }, {}));
            const result = data.map(([key, val]) => { return { x: new Date(key), y: val } });
            return result;
        },
        [orders]
      );


  return (
    <Layout>
      <div>
      <Typography variant="h1">
            Аналитика
        </Typography>
        <Typography paragraph gutterBottom>
            Общее количество заказов: {orders.length}
        </Typography>
        <Typography paragraph>
            Количество отмененных заказов: {orders.reduce((amount, order) => order.orderStatus === "CANCELED" ? amount + 1 : amount, 0)}
        </Typography>
        <Typography paragraph>
            Количество завершенных заказов: {orders.reduce((amount, order) => order.orderStatus === "COMPLETED" ? amount + 1 : amount, 0)}
        </Typography>
        <Typography paragraph>
            Количество доставляемых заказов: {orders.reduce((amount, order) => order.orderStatus === "DELIVERING" ? amount + 1 : amount, 0)}
        </Typography>
        <Typography paragraph>
            Количество обрабатываемых заказов: {orders.reduce((amount, order) => order.orderStatus === "REGISTRATION" ? amount + 1 : amount, 0)}
        </Typography>
        <Typography paragraph>
            Денежная сумма оплаченных заказов за все время: {orders.filter(order => order.orderStatus === "COMPLETED").reduce((amount, order) => amount + Number(order.price), 0)}руб.
        </Typography>
        <Typography paragraph>
            Ожидаемые денежные поступления от выполняемых заказов за все время: {orders.filter(order => order.orderStatus !== "COMPLETED").reduce((amount, order) => amount + Number(order.price), 0)}руб.
        </Typography>
        <Typography paragraph>
            Денежная сумма оплаченных заказов за месяц: {
                orders
                    .filter(order => {
                        return order.orderStatus === "COMPLETED"
                            && new Date(order.startedDate).getMonth() === new Date().getMonth()
                            && new Date(order.startedDate).getFullYear() === new Date().getFullYear()
                    })
                    .reduce((amount, order) => amount + Number(order.price), 0)
            }руб.
        </Typography>
        <Typography paragraph>
            Ожидаемые денежные поступления от выполняемых заказов за месяц: {
                orders
                    .filter(order => {
                        return order.orderStatus !== "COMPLETED"
                            && new Date(order.startedDate).getMonth() === new Date().getMonth()
                            && new Date(order.startedDate).getFullYear() === new Date().getFullYear()
                    })
                    .reduce((amount, order) => amount + Number(order.price), 0)
            }руб.
        </Typography>
        <Typography paragraph gutterBottom>
            Средняя стоимость заказа: {
                orders.reduce((amount, order) => amount + Number(order.price), 0) / orders.length    
            }руб.
        </Typography>
        <Typography variant="h5">
            График количества заказов
        </Typography>
        <div style={wrapperStyles}>
            <VictoryChart
                theme={VictoryTheme.material}
                style={styles}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 7
                        }
                    }}
                    scale={{ x: "time" }}
                />
                <VictoryAxis
                    dependentAxis
                    orientation="left"
                    style={{ tickLabels: { fontSize: 10 } }}
                    scale={{ x: "time" }}
                />
                <VictoryLine
                    data={data}
                />
            </VictoryChart>
        </div>
        <Typography variant="h5">
            График стоимости заказов (в руб.)
        </Typography>
        <div style={wrapperStyles}>
            <VictoryChart
                theme={VictoryTheme.material}
                style={styles}
            >
                <VictoryAxis
                    style={{
                        tickLabels: {
                            fontSize: 7
                        }
                    }}
                    scale={{ x: "time" }}
                />
                <VictoryAxis
                    dependentAxis
                    orientation="left"
                    style={{ tickLabels: { fontSize: 10 } }}
                    scale={{ x: "time" }}
                />
                <VictoryLine
                    data={priceData}
                />
            </VictoryChart>
        </div>
        
      </div>
    </Layout>
  );
}


const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const connector = connect(mapStateToProps);

export default connector(NotifyPage);