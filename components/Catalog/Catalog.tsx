import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './Catalog.module.scss';
import { productsArray } from '../../contants/const';
import ProductContainer from '../ProductContainer/ProductContainer';

export interface CatalogProps {
  className?: string;
}

export default function Catalog({ className }: CatalogProps) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    setProducts(productsArray);
  }, []);
  
  return (
    <div className={cn(styles.container, className)}>
      <ProductContainer products={products} />
    </div>
  );
}
