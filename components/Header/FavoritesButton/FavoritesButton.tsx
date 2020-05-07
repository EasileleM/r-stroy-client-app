import React from 'react';
import Link from 'next/link';

import styles from './FavoritesButton.module.scss';

export function FavoritesButton() {
  return (
    <Link href='/'>
      <a href='/'>
        Избранное
      </a>
    </Link>
  );
}