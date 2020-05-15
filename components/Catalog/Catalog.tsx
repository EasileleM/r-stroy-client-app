import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './Catalog.module.scss';

import { AppDispatch, RootState } from '../../redux/types';
import { catalogInitAction } from '../../redux/catalog/actions/catalogInitAction';

import { ERROR_URL } from '../../contants/const';

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
    hasError
  }: Props
) {
  const router = useRouter();

  useEffect(() => {
    catalogInit();
    return () => catalogReset();
  }, []);

  useEffect(() => {
    if (hasError) {
      router.push(ERROR_URL);
    }
  }, [hasError]);
  
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
                <ProductContainer products={products} />
            }
          </>
      }

    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.catalog.products,
  areFiltersLoading: state.catalog.areFiltersLoading,
  areProductsLoading: state.catalog.areProductsLoading,
  hasError: state.catalog.hasError
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  catalogInit: () => dispatch(catalogInitAction()),
  catalogReset: () => dispatch(catalogResetAction())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);