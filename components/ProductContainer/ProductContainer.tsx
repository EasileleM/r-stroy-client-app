import React from 'react';
import cn from 'classnames';

import Pagination from '@material-ui/lab/Pagination';
import { CircularProgress } from '@material-ui/core';
import styles from './ProductContainer.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../interfaces/Product';

export interface ProductContainerProps {
  styleContainer?: string;
  products: Array<Product>;
  areProductsLoading?: boolean;
  noProductsMessage?: string;
  pagination?: boolean;
  pagesAmount?: number;
  currentPage?: number;
  changePage?: (e, page: number) => void;
}

export function ProductContainer({
  styleContainer,
  products,
  pagesAmount,
  changePage,
  pagination,
  currentPage,
  areProductsLoading,
  noProductsMessage
}: ProductContainerProps) {
  return (
    <div className={cn(styles.container, styleContainer)}>
      <div className={styles.productsList}>
        {
          areProductsLoading &&
            <div className={styles.productsLoadingIndicator}>
              <CircularProgress />
            </div>
        }
        {
          (products.length > 0) ?
            products.map(
              product => <ProductCard key={product.id} product={product} />
            )
            :
            (!areProductsLoading && (noProductsMessage || 'По данному запросу ничего не найдено!'))
        }
      </div>
      {
        pagination && pagesAmount > 1 &&
        <Pagination 
          className={styles.pagination}
          count={pagesAmount}
          page={currentPage}
          onChange={changePage}
        />
      }
    </div>
  );
}
