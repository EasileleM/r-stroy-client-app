import React from 'react';
import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';

import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Link from 'next/link';
import styles from './ProductCard.module.scss';

import { Product } from '../../interfaces/Product';
import { AppDispatch } from '../../redux/types';
import { addToCartAction } from '../../redux/user/actions/addToCartAction';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

export interface ProductCardProps {
  styleContainer?: string;
  wide?: boolean;
  readonly product: Product;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProductCardProps & PropsFromRedux;

export function ProductCard({
  styleContainer,
  product,
  addToCart,
  wide
}: Props) {
  return (
    <Card
      className={cn(styles.container, styleContainer, { [styles.wide]: wide })}
    >
      <Link href='product/[id]' as={`product/${product.id}`}>
        <a className={cn(styles.link)}>
          <CardActionArea>
            <CardMedia
              className={styles.image}
              image={product.imageURL}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              {
                wide &&
                <Typography variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
              }
              {
                wide &&
                <Typography variant="body2" color="textSecondary" component="p">
                  Категории: {product.types.join(' ')}
                </Typography>
              }
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
            руб./шт.
          </p>
          <AddToFavoritesButton product={product} />
        </div>
        <AddToCartButton
          handleClick={
            () => addToCart({ ...product, amountInCart: 1 })
          }
        />
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product))
});

const connector = connect(null, mapDispatchToProps);

export default connector(ProductCard);