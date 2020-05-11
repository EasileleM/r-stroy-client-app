import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import styles from './Filters.module.scss';

import { AppDispatch, RootState } from '../../redux/rootTypes';
import { applyFiltersAction } from '../../redux/catalog/actions/applyFiltersAction';

export interface FiltersProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FiltersProps & PropsFromRedux;

// eslint-disable-next-line max-len
export function Filters({ className, filters, appliedFilters, applyFilters }: Props) {
  return (
    <div className={cn(styles.container, className)}>
      Filters <br />
      {
        filters && filters.types.map(type => <p key={type}>{type}</p>)
      }
      highest price: {filters && filters.highestPrice} <br />
      lowest price: {filters && filters.lowestPrice}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filters: state.catalog.filters,
  appliedFilters: state.catalog.appliedFilters
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  applyFilters: (appliedFilters) => dispatch(applyFiltersAction(appliedFilters))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Filters);