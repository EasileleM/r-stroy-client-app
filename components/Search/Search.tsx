import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import styles from './Search.module.scss';
import SearchIcon from '../../public/images/search.svg';
import { AppDispatch } from '../../redux/rootTypes';
import { updateCatalogAction } from '../../redux/catalog/actions/updateCatalogAction';

export interface SearchProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = SearchProps & PropsFromRedux;

export function Search({ className, applySearch }: Props) {
  const router = useRouter();

  const inCatalog = router.pathname.includes('catalog');
  const [searchQuery, setSearchQuery] = useState(inCatalog && router.query.q ? router.query.q : '');
  const [targetURL, setTargetURL] = useState({ pathname: '/catalog', query: {} });

  useEffect(() => {
    if (!inCatalog) {
      setTargetURL({
        ...targetURL,
        query: {
          ...router.query,
          q: searchQuery
        }
      });
    }
  }, [searchQuery, router, inCatalog]);

  useEffect(() => {
    if (inCatalog) {
      setSearchQuery(router.query.q || '');
    }
  }, [router.query.q, inCatalog]);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inCatalog) {
      e.preventDefault();
      applySearch(searchQuery, router);
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

      {
        inCatalog ?
          (
            <button className={styles.searchButton} type='submit'>
              <SearchIcon className={styles.searchButton__icon} />
            </button>
          ) :
          (
            <Link href={targetURL}>
              <a className={styles.searchButton}>
                <SearchIcon className={styles.searchButton__icon} />
              </a>
            </Link>
          )
      }
      
    </form>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  applySearch: async (searchQuery, router) => {
    await dispatch(updateCatalogAction({ searchQuery }, router));
  }
});

const connector = connect(null, mapDispatchToProps);

export default connector(Search);