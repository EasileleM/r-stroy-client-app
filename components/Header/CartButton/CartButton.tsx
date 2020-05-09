import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import styles from './CartButton.module.scss';
import headerStyles from '../Header.module.scss';

import CartIcon from '../../../public/images/cart.svg';
import { mobileScreenSize } from '../../../contants/const';

export interface CartButtonProps {
  containerStyles: string;
}

export function CartButton({ containerStyles }: CartButtonProps) {
  const isMobile = useMediaQuery({ maxWidth: mobileScreenSize });
  return (
    <Link href="/">
      <a href="/" className={cn(containerStyles, headerStyles.counterButton)}>
        <CartIcon className={cn(headerStyles.link__icon, styles.icon)} />
        <div className={headerStyles.counterButton__counter}>0</div>
        {!isMobile && (
          <p className={headerStyles.counterButton__text}>Корзина</p>
        )}
      </a>
    </Link>
  );
}
