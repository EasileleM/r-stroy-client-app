import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import UserIcon from '../../../public/images/user.svg';

import styles from './ProfileButton.module.scss';
import headerStyles from '../Header.module.scss';

export interface ProfileButtonInterface {
  containerStyles?: string
}

export function ProfileButton({ containerStyles }: ProfileButtonInterface) {
  return (
    <Link href="/">
      <a
        href="/"
        className={cn(headerStyles.specialButton, containerStyles)}
      >
        <UserIcon className={cn(headerStyles.link__icon, styles.icon)} />
        <p className={cn(headerStyles.specialButton__text)}>Личный кабинет</p>
      </a>
    </Link>
  );
}
