import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import UserIcon from '../../../public/images/user.svg';

import styles from './ProfileButton.module.scss';
import headerStyles from '../Header.module.scss';

export function ProfileButton() {
  return (
    <Link href='/'>
      <a
        href='/'
        className={
          cn(
            styles.container,
            headerStyles.link,
            headerStyles.link_small,
            headerStyles.containerWithGap__item
          )
        }
      >
        <UserIcon className={cn(headerStyles.link__icon)} />
        <p className={cn(headerStyles.link__text)}>Личный кабинет</p>
      </a>
    </Link>
  );
}