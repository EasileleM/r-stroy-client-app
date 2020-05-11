import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import styles from './Catalog.module.scss';
import ProductContainer from '../ProductContainer/ProductContainer';
import { AppDispatch, RootState } from '../../redux/rootTypes';
import { fillCatalogAction } from '../../redux/catalog/actions/fillCatalogAction';

export interface CatalogProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CatalogProps & PropsFromRedux;

export function Catalog({ className, products, fillCatalog }: Props) {
  useEffect(() => {
    fillCatalog();
  }, [fillCatalog]);
  
  return (
    <div className={cn(styles.container, className)}>
      <ProductContainer products={products} />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.catalog.products
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fillCatalog: () => dispatch(fillCatalogAction())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);