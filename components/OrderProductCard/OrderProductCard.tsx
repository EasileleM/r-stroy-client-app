import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Input,
  Typography
} from '@material-ui/core';
import Link from 'next/link';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styles from './OrderProductCard.module.scss';

import { CartProduct } from '../../interfaces/CartProduct';
import { Product } from '../../interfaces/Product';

export interface OrderProductCardProps {
  styleContainer?: string;
  changeable?: boolean;
  removeFromOrder?: (product: Product) => void;
  changeAmount?: (product: Product, amount: number) => void;
  amount: number;
  readonly product: CartProduct;
}

export function OrderProductCard({
  styleContainer,
  product,
  amount,
  removeFromOrder,
  changeAmount,
  changeable
}: OrderProductCardProps) {
  const [amountInputValue, setAmountInputValue] =
    useState(amount);

  useEffect(() => {
    setAmountInputValue(amount);
  }, [amount]);

  const handleChangeProductAmount = (newAmount) => {
    if (newAmount <= 0) {
      removeFromOrder(product);
    } else if (newAmount <= product.amount) {
      setAmountInputValue(newAmount);
      changeAmount(product, newAmount);
    }
  };

  const handleRemoveFromOrder = () => {
    removeFromOrder(product);
  };

  return (
    <Card className={cn(styles.container, styleContainer)}>
      <Link href='item/[id]' as={`item/${product.id}`}>
        <a className={cn(styles.link)}>
          <CardActionArea className={cn(styles.productContent)}>
            <CardMedia
              className={styles.image}
              image={product.imageURL}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.amount}шт. на складе
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <CardActions classes={{ root: styles.actions }}>
        <div className={styles.priceAndFavoritesWrapper}>
          <p className={styles.price__text}>
            <span className={styles.price}>{product.price}</span>
            руб./шт
          </p>
          <div className={styles.amountControls}>
            {
              changeable &&
              <IconButton
                edge="start"
                color="inherit"
                onClick={
                    () => handleChangeProductAmount(amount - 1)
                  }
                aria-label="close"
              >
                <RemoveIcon fontSize='small' />
              </IconButton>
            }
            <Input
              className={styles.amountInput}
              disabled
              value={amountInputValue}
            />
            {
              changeable &&
              <IconButton
                edge="start"
                color="inherit"
                onClick={
                    () => handleChangeProductAmount(amount + 1)
                  }
                aria-label="close"
              >
                <AddIcon fontSize='small' />
              </IconButton>
            }
            
          </div>
          <p className={styles.price__text}>
            <span className={styles.price}>
              {(product.price * amount).toFixed(2)}
            </span>
            руб.
          </p>
          {
            changeable &&
            <IconButton edge="start" color="inherit" onClick={handleRemoveFromOrder} aria-label="close">
              <CloseIcon fontSize='large' />
            </IconButton>
          }
        </div>
      </CardActions>
    </Card>
  );
}