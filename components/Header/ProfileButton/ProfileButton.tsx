import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './ProfileButton.module.scss';
import headerStyles from '../Header.module.scss';

export function ProfileButton() {
  return (
    <Link href='/'>
      <a href='/' className={cn(headerStyles.link, headerStyles.link_small, headerStyles.containerWithGap__item)}>
        Личный кабинет
      </a>
    </Link>
  );
}