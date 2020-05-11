import React from 'react';
import cn from 'classnames';

import styles from './ProductCard.module.scss';
import { Product } from '../../interfaces/Product';

export interface ProductCardProps {
  styleContainer?: string;
  readonly product: Product;
}

export function ProductCard({ styleContainer, product }: ProductCardProps) {
  return (
    <div className={cn(styles.container, styleContainer)}>
      name: {product.name} <br />
      description: {product.description} <br />
      types: {product.types.join(' ')} <br />
      amount: {product.amount} <br />
      price: {product.price} <br />
      inFavorites: {String(product.inFavorites)} <br />
      inCart: {String(product.inCart)} <br />
      <button type='button'>в избранное</button>
      <button type='button'>в корзину</button>
    </div>
  );
}
