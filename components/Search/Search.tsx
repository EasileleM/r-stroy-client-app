import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { useRouter } from 'next/router';
import styles from './Search.module.scss';
import SearchIcon from '../../public/images/search.svg';

export interface SearchProps {
  className?: string;
}

export function Search({ className }: SearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(router.pathname.includes('catalog') && router.query.q ? router.query.q : '');
  const [targetURL, setTargetURL] = useState({ pathname: '/catalog', query: {} });

  useEffect(() => {
    setTargetURL({
      ...targetURL,
      query: {
        ...router.query,
        q: searchQuery
      }
    });
  }, [searchQuery, router]);

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form className={cn(styles.container, className)}>
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

      <Link href={targetURL}>
        <a className={styles.searchButton}>
          <SearchIcon className={styles.searchButton__icon} />
        </a>
      </Link>
    </form>
  );
}
