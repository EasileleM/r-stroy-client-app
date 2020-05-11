import React from 'react';
import cn from 'classnames';

import styles from './ProductContainer.module.scss';
import { Product } from '../../interfaces/Product';
import { ProductCard } from '../ProductCard/ProductCard';

export interface ProductContainerProps {
  styleContainer?: string;
  readonly products: Array<Product>;
}

// eslint-disable-next-line max-len
export default function ProductContainer({ styleContainer, products }: ProductContainerProps) {
  return (
    <div className={cn(styles.container, styleContainer)}>
      {
        products
          .map(product => <ProductCard key={product.id} product={product} />)
      }
    </div>
  );
}
