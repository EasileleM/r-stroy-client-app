import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './FavoritesButton.module.scss';
import headerStyles from '../Header.module.scss';

import FavoritesActiveIcon from '../../../public/images/favoritesActive.svg';

export interface FavoritesButtonProps {
  containerStyles: string;
}

export function FavoritesButton({ containerStyles }: FavoritesButtonProps) {
  return (
    <Link href="/">
      <a href="/" className={cn(headerStyles.counterButton, containerStyles)}>
        <FavoritesActiveIcon
          className={cn(headerStyles.link__icon, styles.icon)}
        />
        <div className={headerStyles.counterButton__counter}>0</div>
        <p className={headerStyles.counterButton__text}>Избранное</p>
      </a>
    </Link>
  );
}
