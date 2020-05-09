import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './FavoritesButton.module.scss';

import FavoritesActiveIcon from '../../../public/images/favoritesActive.svg';

export interface FavoritesButtonProps {
  containerStyles: string
}

export function FavoritesButton({ containerStyles }: FavoritesButtonProps) {
  return (
    <Link href='/'>
      <a
        href='/'
        className={
          cn(
            styles.container,
            containerStyles
          )
        }
      >
        <FavoritesActiveIcon className={cn(styles.icon)} />
        <div className={styles.counter}>0</div>
        <p className={styles.text}>Избранное</p>
      </a>
    </Link>
  );
}