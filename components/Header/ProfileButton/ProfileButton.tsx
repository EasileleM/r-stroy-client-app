import React from 'react';
import Link from 'next/link';

import styles from './ProfileButton.module.scss';

export function ProfileButton() {
  return (
    <Link href='/'>
      <a href='/'>
        Личный кабинет
      </a>
    </Link>
  );
}