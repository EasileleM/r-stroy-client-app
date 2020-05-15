import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './Catalog.module.scss';

import { AppDispatch, RootState } from '../../redux/types';
import { catalogInitAction } from '../../redux/catalog/actions/catalogInitAction';

import Filters from '../Filters/Filters';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Filters as FiltersInterface } from '../../interfaces/Filters';
import { catalogResetAction } from '../../redux/catalog/actions/catalogResetAction';
import { catalogUpdateAction } from '../../redux/catalog/actions/catalogUpdateAction';
import { ERROR_URL } from '../../contants/const';

export interface CatalogProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CatalogProps & PropsFromRedux;

export function Catalog(
  {
    className,
    products,
    searchQuery,
    filters,
    catalogInit,
    catalogUpdate,
    catalogReset,
    areFiltersLoading,
    areProductsLoading,
    hasError
  }: Props
) {
  const router = useRouter();

  useEffect(() => {
    catalogInit(router.query);
    return () => catalogReset();
  }, []);

  useEffect(() => {
    if (hasError) {
      router.push(ERROR_URL);
    }
  }, [hasError]);

  const handleApplyFilters = (appliedFilters: FiltersInterface) => {
    catalogUpdate(appliedFilters, searchQuery);
  };

  const handleClearQueryArguments = () => {
    const initialFilters = {
      ...filters,
      types: []
    };
    const emptySearch = '';
    catalogUpdate(initialFilters, emptySearch);
  };
  
  return (
    <div className={cn(styles.container, className)}>
      {
        areFiltersLoading ?
          <p>Loading</p>
          :
          <>
            <Filters
              clearFilters={handleClearQueryArguments}
              applyFilters={handleApplyFilters}
            />
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
  filters: state.catalog.filters,
  searchQuery: state.catalog.searchQuery,
  areFiltersLoading: state.catalog.areFiltersLoading,
  areProductsLoading: state.catalog.areProductsLoading,
  hasError: state.catalog.hasError
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  catalogInit: (query) => dispatch(catalogInitAction(query)),
  catalogUpdate: (appliedFilters, searchQuery) => {
    dispatch(catalogUpdateAction(appliedFilters, searchQuery));
  },
  catalogReset: () => dispatch(catalogResetAction())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);