import React from 'react';
import Link from 'next/link';

import styles from './CartButton.module.scss';

export function CartButton() {
  return (
    <Link href='/'>
      <a href='/'>
        Корзина
      </a>
    </Link>
  );
}