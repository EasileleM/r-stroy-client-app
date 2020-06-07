import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import { CircularProgress } from '@material-ui/core';
import styles from './Catalog.module.scss';

import { AppDispatch, RootState } from '../../redux/types';
import { catalogInitAction } from '../../redux/catalog/actions/catalogInitAction';

import Filters from '../Filters/Filters';
import { ProductContainer } from '../ProductContainer/ProductContainer';
import { catalogResetAction } from '../../redux/catalog/actions/catalogResetAction';
import { changePageAction } from '../../redux/catalog/actions/changePageAction';

export interface CatalogProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CatalogProps & PropsFromRedux;

export function Catalog(
  {
    className,
    catalogInit,
    catalogReset,
    areFiltersLoading,
    currentPage,
    pagesAmount,
    changePage,
    products,
    areProductsLoading
  }: Props
) {
  useEffect(() => {
    catalogInit();
    return () => catalogReset();
  }, []);

  return (
    <div className={cn(styles.container, className)}>
      {
        areFiltersLoading ?
          <div className={styles.productsLoadingIndicator}>
            <CircularProgress />
          </div> :
          <>
            <Filters />
            <ProductContainer
              products={products}
              areProductsLoading={areProductsLoading}
              pagesAmount={pagesAmount}
              currentPage={currentPage}
              changePage={changePage}
              pagination
            />
          </>
      }
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentPage: state.catalog.currentPage,
  pagesAmount: state.catalog.pagesAmount,
  areFiltersLoading: state.catalog.areFiltersLoading,
  products: state.catalog.products,
  areProductsLoading: state.catalog.areProductsLoading
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  catalogInit: () => dispatch(catalogInitAction()),
  catalogReset: () => dispatch(catalogResetAction()),
  changePage: (e, page) => dispatch(changePageAction(page))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);