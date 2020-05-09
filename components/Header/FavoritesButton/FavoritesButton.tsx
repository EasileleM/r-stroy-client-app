import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import styles from './FavoritesButton.module.scss';
import headerStyles from '../Header.module.scss';

import FavoritesActiveIcon from '../../../public/images/favoritesActive.svg';
import { mobileScreenSize } from '../../../contants/const';

export interface FavoritesButtonProps {
  containerStyles: string;
}

export function FavoritesButton({ containerStyles }: FavoritesButtonProps) {
  const isMobile = useMediaQuery({ maxWidth: mobileScreenSize });
  return (
    <Link href="/">
      <a href="/" className={cn(headerStyles.counterButton, containerStyles)}>
        <FavoritesActiveIcon
          className={cn(headerStyles.link__icon, styles.icon)}
        />
        <div className={headerStyles.counterButton__counter}>0</div>
        {!isMobile && (
          <p className={headerStyles.counterButton__text}>Избранное</p>
        )}
      </a>
    </Link>
  );
}
