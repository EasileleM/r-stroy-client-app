import React from 'react';
import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';

import styles from './ProductCard.module.scss';

import { Product } from '../../interfaces/Product';
import { AppDispatch } from '../../redux/types';
import { addToCartAction } from '../../redux/user/actions/addToCartAction';
import { addToFavoritesAction } from '../../redux/user/actions/addToFavoritesAction';
import { removeFromFavoritesAction } from '../../redux/user/actions/removeFromFavoritesAction';

export interface ProductCardProps {
  styleContainer?: string;
  readonly product: Product;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProductCardProps & PropsFromRedux;

export function ProductCard({
  styleContainer,
  product,
  addToCart,
  addToFavorites,
  removeFromFavorites
}: Props) {
  const toggleFavorites = () => {
    if (product.inFavorites) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className={cn(styles.container, styleContainer)}>
      name: {product.name} <br />
      description: {product.description} <br />
      types: {product.types.join(' ')} <br />
      amount: {product.amount} <br />
      price: {product.price} <br />
      inFavorites: {String(product.inFavorites)} <br />
      <button type='button' onClick={toggleFavorites}>в избранное</button>
      <button type='button' onClick={() => addToCart(product)}>в корзину</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product)),
  addToFavorites: (product) => dispatch(addToFavoritesAction(product)),
  removeFromFavorites: (product) => dispatch(removeFromFavoritesAction(product))
});

const connector = connect(null, mapDispatchToProps);

export default connector(ProductCard);