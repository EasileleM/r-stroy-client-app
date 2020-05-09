import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import UserIcon from '../../../public/images/user.svg';

import styles from './ProfileButton.module.scss';
import headerStyles from '../Header.module.scss';
import { mobileScreenSize } from '../../../contants/const';

export function ProfileButton() {
  const isMobile = useMediaQuery({ maxWidth: mobileScreenSize });
  return (
    <Link href="/">
      <a
        href="/"
        className={cn(
          styles.container,
          headerStyles.link,
          headerStyles.link_small,
          headerStyles.containerWithGap__item
        )}
      >
        <UserIcon className={cn(headerStyles.link__icon)} />
        {!isMobile && (
          <p className={cn(headerStyles.link__text)}>Личный кабинет</p>
        )}
      </a>
    </Link>
  );
}
