import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import styles from './Filters.module.scss';

import { RootState } from '../../redux/types';
import { Filters as FiltersInterface } from '../../interfaces/Filters';

export interface FiltersProps {
  className?: string;
  applyFilters: (appliedFilters: FiltersInterface) => void;
  cleanFilters: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FiltersProps & PropsFromRedux;

// eslint-disable-next-line max-len
export function Filters({ className, filters, applyFilters, appliedFilters, cleanFilters }: Props) {
  const [currentTypes, setCurrentTypes] = useState({});
  const [currentHighestPrice, setCurrentHighestPrice] = useState(0);
  const [currentLowestPrice, setCurrentLowestPrice] = useState(0);

  useEffect(() => {
    if (filters && appliedFilters) {
      const initialFilters = appliedFilters;
      setCurrentHighestPrice(initialFilters.highestPrice);
      setCurrentLowestPrice(initialFilters.lowestPrice);
      const typesObject = initialFilters.types.reduce((types, type) => {
        return {
          ...types,
          [type]: true
        };
      }, {});
      setCurrentTypes(typesObject);
    }
  }, [filters, appliedFilters]);

  const toggleType = (name) => {
    const newTypes = { ...currentTypes };
    newTypes[name] = !newTypes[name];
    setCurrentTypes(newTypes);
  };

  const setHighestPrice = (e) => {
    setCurrentHighestPrice(Number(e.target.value));
  };

  const setLowestPrice = (e) => {
    setCurrentLowestPrice(Number(e.target.value));
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
      highest price:
      <input
        onChange={(e) => setHighestPrice(e)}
        type='text'
        value={currentHighestPrice}
      />
      lowest price:
      <input
        onChange={(e) => setLowestPrice(e)}
        type='text'
        value={currentLowestPrice}
      />
      <button type='button' onClick={handleApplyFilters}>
        apply filters
      </button>
      <button type='button' onClick={cleanFilters}>
        clear filters
      </button>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filters: state.catalog.filters,
  appliedFilters: state.catalog.appliedFilters
});

const connector = connect(mapStateToProps);

export default connector(Filters);