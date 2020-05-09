import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './CartButton.module.scss';

import CartIcon from '../../../public/images/cart.svg';

export interface CartButtonProps {
  containerStyles: string
}

export function CartButton({ containerStyles }: CartButtonProps) {
  return (
    <Link href='/'>
      <a href='/' className={cn(containerStyles, styles.container)}>
        <CartIcon className={styles.icon} />
        <div className={styles.counter}>0</div>
        <p className={styles.text}>Корзина</p>
      </a>
    </Link>
  );
}