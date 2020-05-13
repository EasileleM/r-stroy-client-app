import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import styles from './Search.module.scss';
import SearchIcon from '../../public/images/search.svg';
import { AppDispatch, RootState } from '../../redux/types';
import { catalogUpdateAction } from '../../redux/catalog/actions/catalogUpdateAction';

export interface SearchProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = SearchProps & PropsFromRedux;

export function Search({
  className,
  updateCatalog,
  appliedFilters,
  searchQueryFromStore
}: Props) {
  const router = useRouter();

  const inCatalog = router.pathname.includes('catalog');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (inCatalog) {
      setSearchQuery(searchQueryFromStore);
    }
  }, [searchQueryFromStore, inCatalog]);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inCatalog) {
      updateCatalog(appliedFilters, searchQuery, router);
    } else {
      const targetUrl = {
        pathname: '/catalog',
        query: {
          ...router.query,
          q: searchQuery
        }
      };
      router.push(targetUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn(styles.container, className)}>
      <input
        placeholder="Более 5 тысяч товаров"
        id="searchQuery"
        className={styles.input}
        type="text"
        onChange={handleOnChange}
        value={searchQuery}
      />
      <label htmlFor="searchQuery" className={styles.input__label}>
        Поиск
      </label>

      <button className={styles.searchButton} type='submit'>
        <SearchIcon className={styles.searchButton__icon} />
      </button>
    </form>
  );
}

const mapStateToProps = (state: RootState) => ({
  appliedFilters: state.catalog.appliedFilters,
  searchQueryFromStore: state.catalog.searchQuery
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateCatalog: (appliedFilters, searchQuery, router) => {
    dispatch(catalogUpdateAction(appliedFilters, searchQuery, router));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Search);