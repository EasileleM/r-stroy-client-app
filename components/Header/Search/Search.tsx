import React from 'react';

import styles from './Search.module.scss';
import SearchIcon from '../../../public/images/search.svg';

export function Search() {
  return (
    <form className={styles.container}>
      <input placeholder='Поиск' id='searchQuery' className={styles.input} type='text' />
      <label htmlFor='searchQuery' className={styles.input__label}>Search</label>

      <button id='searchButton' type='button'>
        <SearchIcon className={styles.searchButton__icon} />
      </button>
    </form>
  );
}