import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import styles from './Filters.module.scss';

import { AppDispatch, RootState } from '../../redux/types';
import { applyFiltersAction } from '../../redux/catalog/actions/applyFiltersAction';
import { applySearchAction } from '../../redux/catalog/actions/applySearchAction';
import { changePageAction } from '../../redux/catalog/actions/changePageAction';

export interface FiltersProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FiltersProps & PropsFromRedux;

export function Filters({
  className,
  filters,
  applyFilters,
  appliedFilters,
  applySearch,
  changePage
}: Props) {
  const [nonAppliedFilters, setNonAppliedFilters] = useState({
    types: [],
    highestPrice: 0,
    lowestPrice: 0
  });

  useEffect(() => {
    setNonAppliedFilters({ ...appliedFilters });
  }, [appliedFilters]);

  const changeFilters = (key, value) => {
    const newFilters = { ...nonAppliedFilters };
    if (key === 'types') {
      const index = newFilters.types.indexOf(value);
      if (index !== -1) {
        newFilters.types.splice(index, 1);
      } else {
        newFilters.types.push(value);
      }
    } else {
      newFilters[key] = value;
    }
    setNonAppliedFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters(nonAppliedFilters);
  };

  const handleClearQueryArguments = () => {
    const initialFilters = {
      ...filters,
      types: []
    };
    const emptySearch = '';
    applyFilters(initialFilters);
    applySearch(emptySearch);
    changePage(1);
  };

  return (
    <div className={cn(styles.container, className)}>
      Filters <br />
      {
        filters.types
          .map(type => {
            return (
              <div key={type}>
                <input
                  checked={nonAppliedFilters.types.includes(type)}
                  onChange={() => changeFilters('types', type)}
                  type='checkbox'
                />
                {type}
              </div>
            );
          })
      }
      highest price:
      <input
        onChange={(e) => changeFilters('highestPrice', Number(e.target.value))}
        type='text'
        value={nonAppliedFilters.highestPrice}
      />
      lowest price:
      <input
        onChange={(e) => changeFilters('lowestPrice', Number(e.target.value))}
        type='text'
        value={nonAppliedFilters.lowestPrice}
      />
      <button type='button' onClick={handleApplyFilters}>
        apply filters
      </button>
      <button type='button' onClick={handleClearQueryArguments}>
        clear filters
      </button>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filters: state.catalog.filters,
  appliedFilters: state.catalog.appliedFilters
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  applyFilters: (appliedFilters) => {
    dispatch(applyFiltersAction(appliedFilters));
  },
  applySearch: (searchQuery) => {
    dispatch(applySearchAction(searchQuery));
  },
  changePage: (page) => {
    dispatch(changePageAction(page));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Filters);