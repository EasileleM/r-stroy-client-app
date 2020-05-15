import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import styles from './Search.module.scss';
import SearchIcon from '../../public/images/search.svg';
import { AppDispatch, RootState } from '../../redux/types';
import { CATALOG_URL } from '../../contants/const';
import { applySearchAction } from '../../redux/catalog/actions/applySearchAction';

export interface SearchProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = SearchProps & PropsFromRedux;

export function Search({
  className,
  applySearch,
  searchQueryFromStore
}: Props) {
  const router = useRouter();

  const [inCatalog, setInCatalog] = useState(router.pathname.includes('catalog'));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (inCatalog) {
      setSearchQuery(searchQueryFromStore);
    }
  }, [searchQueryFromStore, inCatalog]);

  useEffect(() => {
    setInCatalog(router.pathname.includes('catalog'));
  }, [router]);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inCatalog) {
      applySearch(searchQuery);
    } else {
      const targetUrl = {
        pathname: CATALOG_URL,
        query: {
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
  searchQueryFromStore: state.catalog.searchQuery
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  applySearch: (searchQuery) => {
    dispatch(applySearchAction(searchQuery));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Search);