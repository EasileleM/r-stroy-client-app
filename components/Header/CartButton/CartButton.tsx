import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './CartButton.module.scss';
import headerStyles from '../Header.module.scss';

import CartIcon from '../../../public/images/cart.svg';

export interface CartButtonProps {
  containerStyles?: string;
}

export function CartButton({ containerStyles }: CartButtonProps) {
  return (
    <Link href="/">
      <a className={cn(containerStyles, headerStyles.specialButton)}>
        <CartIcon className={cn(headerStyles.link__icon, styles.icon)} />
        <div className={headerStyles.specialButton__counter}>0</div>
        <p className={headerStyles.specialButton__text}>Корзина</p>
      </a>
    </Link>
  );
}
