import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import styles from './Filters.module.scss';

import { AppDispatch, RootState } from '../../redux/rootTypes';
import { Filters as FiltersInterface } from '../../interfaces/Filters';
import { updateProductsAction } from '../../redux/catalog/actions/updateProductsAction';

export interface FiltersProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FiltersProps & PropsFromRedux;

// eslint-disable-next-line max-len
export function Filters({ className, filters, applyFilters }: Props) {
  const [currentTypes, setCurrentTypes] = useState({});
  const [currentHighestPrice, setCurrentHighestPrice] = useState(0);
  const [currentLowestPrice, setCurrentLowestPrice] = useState(0);

  useEffect(() => {
    if (filters) {
      setCurrentHighestPrice(filters.highestPrice);
      setCurrentLowestPrice(filters.lowestPrice);
    }
  }, [filters]);

  const toggleType = (name) => {
    const newTypes = { ...currentTypes };
    newTypes[name] = !newTypes[name];
    setCurrentTypes(newTypes);
  };

  const setHighestPrice = (price) => {
    setCurrentHighestPrice(price);
  };

  const setLowestPrice = (price) => {
    setCurrentLowestPrice(price);
  };

  const handleApplyFilters = () => {
    applyFilters({
      types: Object
        .entries(currentTypes)
        .filter(entry => entry[1])
        .map(entry => entry[0]),
      highestPrice: currentHighestPrice,
      lowestPrice: currentLowestPrice
    });
  };

  return (
    <div className={cn(styles.container, className)}>
      Filters <br />
      {
        filters &&
        filters.types
          .map(type => {
            return (
              <div key={type}>
                <input
                  checked={Boolean(currentTypes[type])}
                  onChange={() => toggleType(type)}
                  type='checkbox'
                />
                {type}
              </div>
            );
          })
      }
      highest price: <input onChange={(e) => setHighestPrice(Number(e.target.value))} type='text' value={currentHighestPrice} />
      lowest price: <input onChange={(e) => setLowestPrice(Number(e.target.value))} type='text' value={currentLowestPrice} />
      <button type='button' onClick={handleApplyFilters}>
        apply filters
      </button>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filters: state.catalog.filters
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  applyFilters: (appliedFilters: FiltersInterface) => {
    dispatch(updateProductsAction({ appliedFilters }));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Filters);