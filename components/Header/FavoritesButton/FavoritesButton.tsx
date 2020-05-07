import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './FavoritesButton.module.scss';
import headerStyles from '../Header.module.scss';

export function FavoritesButton() {
  return (
    <Link href='/'>
      <a href='/' className={cn(headerStyles.link, headerStyles.link_small, headerStyles.containerWithGap__item)}>
        Избранное
      </a>
    </Link>
  );
}