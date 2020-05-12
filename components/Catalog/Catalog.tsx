import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './Catalog.module.scss';

import { AppDispatch, RootState } from '../../redux/rootTypes';
import { fillCatalogAction } from '../../redux/catalog/actions/fillCatalogAction';

import Filters from '../Filters/Filters';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Filters as FiltersInterface } from '../../interfaces/Filters';
import { cleanCatalogAction } from '../../redux/catalog/actions/cleanCatalogAction';
import { updateCatalogAction } from '../../redux/catalog/actions/updateCatalogAction';

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
    fillCatalog,
    updateCatalog,
    cleanCatalog,
    isLoading,
    areProductsLoading
  }: Props
) {
  const router = useRouter();

  useEffect(() => {
    fillCatalog(router.query);
    return () => cleanCatalog(router);
  }, []);

  const handleApplyFilters = (appliedFilters: FiltersInterface) => {
    updateCatalog({ appliedFilters, searchQuery }, router);
  };

  const handleCleanFilters = async () => {
    updateCatalog({
      appliedFilters: {
        ...filters,
        types: []
      },
      searchQuery: ''
    }, router);
  };
  
  return (
    <div className={cn(styles.container, className)}>
      {
        isLoading ?
          <p>Loading</p>
          :
          <>
            <Filters
              cleanFilters={handleCleanFilters}
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
  isLoading: state.catalog.isLoading,
  areProductsLoading: state.catalog.areProductsLoading
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fillCatalog: (appliedFilters) => dispatch(fillCatalogAction(appliedFilters)),
  updateCatalog: ({ appliedFilters, searchQuery }, router) => {
    dispatch(updateCatalogAction({ appliedFilters, searchQuery }, router));
  },
  cleanCatalog: (router) => dispatch(cleanCatalogAction(router))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);