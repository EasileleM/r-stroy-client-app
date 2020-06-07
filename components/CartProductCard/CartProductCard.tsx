import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';

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
import styles from './CartProductCard.module.scss';

import { AppDispatch } from '../../redux/types';
import { addToFavoritesAction } from '../../redux/user/actions/addToFavoritesAction';
import { removeFromFavoritesAction } from '../../redux/user/actions/removeFromFavoritesAction';
import { AddToFavoritesButton } from '../AddToFavoritesButton/AddToFavoritesButton';
import { CartProduct } from '../../interfaces/CartProduct';
import { removeFromCartAction } from '../../redux/user/actions/removeFromCartAction';
import { changeCartProductAmountAction } from '../../redux/user/actions/changeCartProductAmountAction';

export interface CartProductCardProps {
  styleContainer?: string;
  readonly product: CartProduct;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CartProductCardProps & PropsFromRedux;

export function CartProductCard({
  styleContainer,
  product,
  addToFavorites,
  removeFromFavorites,
  removeFromCart,
  changeProductAmount
}: Props) {
  const [amountInputValue, setAmountInputValue] =
    useState(product.amountInCart);

  useEffect(() => {
    setAmountInputValue(product.amountInCart);
  }, [product.amountInCart]);

  const handleChangeProductAmount = (newAmount) => {
    if (newAmount <= 0) {
      removeFromCart(product);
    } else if (newAmount <= product.amount) {
      setAmountInputValue(newAmount);
      changeProductAmount({ ...product, amountInCart: newAmount });
    }
  };

  const toggleFavorites = () => {
    if (product.inFavorites) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
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
            <IconButton
              edge="start"
              color="inherit"
              onClick={
                () => handleChangeProductAmount(product.amountInCart - 1)
              }
              aria-label="close"
            >
              <RemoveIcon fontSize='small' />
            </IconButton>
            <Input
              className={styles.amountInput}
              disabled
              value={amountInputValue}
            />
            <IconButton
              edge="start"
              color="inherit"
              onClick={
                () => handleChangeProductAmount(product.amountInCart + 1)
              }
              aria-label="close"
            >
              <AddIcon fontSize='small' />
            </IconButton>
          </div>
          <p className={styles.price__text}>
            <span className={styles.price}>
              {product.price * product.amountInCart}
            </span>
            руб.
          </p>
          <AddToFavoritesButton
            handleClick={toggleFavorites}
            active={product.inFavorites}
          />
          <IconButton edge="start" color="inherit" onClick={handleRemoveFromCart} aria-label="close">
            <CloseIcon fontSize='large' />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeFromCart: (product) => dispatch(removeFromCartAction(product)),
  changeProductAmount:
    (product) => dispatch(changeCartProductAmountAction(product)),
  addToFavorites: (product) => dispatch(addToFavoritesAction(product)),
  removeFromFavorites: (product) => dispatch(removeFromFavoritesAction(product))
});

const connector = connect(null, mapDispatchToProps);

export default connector(CartProductCard);