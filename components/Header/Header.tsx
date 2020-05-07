import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './Header.module.scss';
import { CartButton } from './CartButton/CartButton';
import { FavoritesButton } from './FavoritesButton/FavoritesButton';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { Search } from './Search/Search';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={cn(styles.row, styles.row_upper)}>
        <div className={styles.row__content}>
          <div className={cn(styles.containerWithGap, styles.alignItemsCenter)}>
            <Link href='/'>
              <a href='/' className={cn(styles.link, styles.link_small, styles.containerWithGap__item)}>
                ул. Лапшова, 10-14, Татищево
              </a>
            </Link>
            <button type='button' className={cn(styles.link, styles.link_small, styles.link_number, styles.containerWithGap__item)}>
              +7-961-648-38-00
            </button>
          </div>

          <div className={cn(styles.containerWithGap, styles.alignItemsCenter)}>
            <FavoritesButton />
            <CartButton />
            <ProfileButton />
          </div>
        </div>
      </div>

      <div className={cn(styles.row, styles.row_lower)}>
        <div className={
            cn(
              styles.row__content,
              styles.containerWithGap,
              styles.alignItemsCenter
            )
          }
        >
          <Link href='/'>
            <a href='/' className={cn(styles.logo, styles.containerWithGap__item)}>
              Р-строй
            </a>
          </Link>

          <Search />

          <Link href='/'>
            <a href='/' className={cn(styles.link, styles.containerWithGap__item)}>
              Каталог
            </a>
          </Link>

          <Link href='/'>
            <a href='/' className={cn(styles.link, styles.containerWithGap__item)}>
              Доставка
            </a>
          </Link>

          <Link href='/'>
            <a href='/' className={cn(styles.link, styles.containerWithGap__item)}>
              Ваши заказы
            </a>
          </Link>

          <Link href='/'>
            <a href='/' className={cn(styles.link, styles.containerWithGap__item)}>
              О нас
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
