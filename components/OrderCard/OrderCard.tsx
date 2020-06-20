import React from 'react';

import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import Link from 'next/link';
import cn from 'classnames';
import { Order } from '../../interfaces/Order';
import styles from './OrderCard.module.scss';
import { orderStatusToString } from '../../utils/orderStatusToString';

export interface OrderCard {
  className?: string;
  data: Order;
}

export function OrderCard({ className, data }: OrderCard) {
  return (
    <Card className={cn(styles.container, className)}>
      <Link href='/order/[id]' as={`/order/${data.id}`}>
        <a className={cn(styles.link)}>
          <CardActionArea className={cn(styles.productContent)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Заказ {data.id}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Статус: {orderStatusToString(data.status)}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Место доставки: {data.arrivalPoint}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Дата оформления заказа: {data.startDate.toLocaleDateString()}
              </Typography>
              {
                data.completedDate &&
                <Typography gutterBottom variant="h5" component="h2">
                  Дата выполнения заказа: {
                    data.completedDate.toLocaleDateString()
                  }
                </Typography>
              }
              {
                Boolean(data.description.length) &&
                <Typography variant="body2" color="textSecondary" component="p">
                  Комментарий: {data.description}
                </Typography>
              }
            </CardContent>
          </CardActionArea>
        </a>
      </Link>
    </Card>
  );
}