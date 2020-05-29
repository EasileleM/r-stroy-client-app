import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { connect, ConnectedProps } from 'react-redux';
import styles from './ProductContainer.module.scss';
import { Product } from '../../interfaces/Product';
import ProductCard from '../ProductCard/ProductCard';
import { AppDispatch } from '../../redux/types';
import { changePageAction } from '../../redux/catalog/actions/changePageAction';

export interface ProductContainerProps {
  styleContainer?: string;
  pagination?: boolean;
  products: Array<Product>;
  currentPage?: number;
  pagesAmount?: number;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProductContainerProps & PropsFromRedux;

export function ProductContainer({
  styleContainer,
  products,
  currentPage,
  pagesAmount,
  pagination,
  changePage
}: Props) {
  const [tempPage, setTempPage] = useState(currentPage);

  useEffect(() => {
    setTempPage(currentPage);
  }, [currentPage]);

  return (
    <div className={cn(styles.container, styleContainer)}>
      {
        products
          .map(product => <ProductCard key={product.id} product={product} />)
      }
      currentPage: {currentPage} <br />
      pagesAmount: {pagesAmount}
      <input
        type='text'
        value={tempPage}
        onChange={(e) => setTempPage(Number(e.target.value))}
      />
      <button type='button' onClick={() => changePage(tempPage)}>
        Изменить страницу
      </button>

    </div>
  );
}


const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changePage: (page) => dispatch(changePageAction(page))
});

const connector = connect(null, mapDispatchToProps);

export default connector(ProductContainer);