import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './Catalog.module.scss';

import { AppDispatch, RootState } from '../../redux/rootTypes';
import { updateProductsAction } from '../../redux/catalog/actions/updateProductsAction';
import { fillCatalogAction } from '../../redux/catalog/actions/fillCatalogAction';

import Filters from '../Filters/Filters';
import ProductContainer from '../ProductContainer/ProductContainer';
import { Filters as FiltersInterface } from '../../interfaces/Filters';
import { AppliedFiltersToQueryInput } from '../../utils/AppliedFiltersToQueryInput';
import { ClearQueryFromFilters } from '../../utils/CleanQueryFromFilters';

export interface CatalogProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CatalogProps & PropsFromRedux;

// eslint-disable-next-line max-len
export function Catalog({ className, products, fillCatalog, updateProducts, filters }: Props) {
  const router = useRouter();

  useEffect(() => {
    fillCatalog(router.query);
  }, [fillCatalog, router]);

  const applyFilters = (appliedFilters: FiltersInterface) => {
    const query = {
      ...ClearQueryFromFilters(router.query, filters),
      ...AppliedFiltersToQueryInput(appliedFilters, filters)
    };

    router.push({
      pathname: '/catalog',
      query
    });

    updateProducts(appliedFilters, query.q as string);
  };
  
  return (
    <div className={cn(styles.container, className)}>
      <Filters applyFilters={applyFilters} />
      <ProductContainer products={products} />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.catalog.products,
  filters: state.catalog.filters
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fillCatalog: (appliedFilters) => dispatch(fillCatalogAction(appliedFilters)),
  updateProducts: (appliedFilters, searchQuery) => {
    dispatch(updateProductsAction(appliedFilters, searchQuery));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Catalog);