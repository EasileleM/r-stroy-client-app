import React from 'react';
import cn from 'classnames';

import styles from './Search.module.scss';
import headerStyles from '../Header.module.scss';
import SearchIcon from '../../../public/images/search.svg';

export function Search() {
  return (
    <form className={cn(styles.container, headerStyles.containerWithGap__item)}>
      <input placeholder='Более 5 тысяч товаров' id='searchQuery' className={styles.input} type='text' />
      <label htmlFor='searchQuery' className={styles.input__label}>Поиск</label>

      <button className={styles.searchButton} type='button'>
        <SearchIcon className={styles.searchButton__icon} />
      </button>
    </form>
  );
}