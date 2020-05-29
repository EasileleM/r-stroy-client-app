import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import styles from './Catalog.module.scss';

import { AppDispatch, RootState } from '../../redux/types';
import { catalogInitAction } from '../../redux/catalog/actions/catalogInitAction';

import Filters from '../Filters/Filters';
import ProductContainer from '../ProductContainer/ProductContainer';
import { catalogResetAction } from '../../redux/catalog/actions/catalogResetAction';

export interface CatalogProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CatalogProps & PropsFromRedux;

export function Catalog(
  {
    className,
    products,
    catalogInit,
    catalogReset,
    areFiltersLoading,
    areProductsLoading,
    currentPage,
    pagesAmount
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
          <p>Loading</p>
          :
          <>
            <Filters />
            {
              areProductsLoading ?
                <p>Loading</p>
                :
                <ProductContainer
                  pagination
                  products={products}
                  currentPage={currentPage}
                  pagesAmount={pagesAmount}
                />
            }
          </>
      }

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.catalog.products,
  currentPage: state.catalog.currentPage,
  pagesAmount: state.catalog.pagesAmount,
  areFiltersLoading: state.catalog.areFiltersLoading,
  areProductsLoading: state.catalog.areProductsLoading
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  catalogInit: () => dispatch(catalogInitAction()),
  catalogReset: () => dispatch(catalogResetAction())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);