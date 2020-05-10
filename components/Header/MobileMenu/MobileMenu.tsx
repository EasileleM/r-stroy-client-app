import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './MobileMenu.module.scss';
import headerStyles from '../Header.module.scss';
import { Search } from '../../Search/Search';
import LocationIcon from '../../../public/images/location.svg';
import PhoneIcon from '../../../public/images/phone.svg';
import { contactNumber } from '../../../contants/const';

export interface MobileMenuProps {
  opened: boolean
}

export function MobileMenu({ opened }: MobileMenuProps) {
  return (
    <div
      className={
        cn(
          styles.container,
          { [styles.opened]: opened, [styles.closed]: !opened }
        )
      }
    >
      <Search />

      <Link href="/">
        <a
          href="/"
          className={
            cn(
              headerStyles.link, headerStyles.containerWithBigGap__item
            )
          }
        >
          Каталог
        </a>
      </Link>

      <Link href="/">
        <a
          href="/"
          className={
            cn(
              headerStyles.link, headerStyles.containerWithBigGap__item
            )
          }
        >
          Доставка
        </a>
      </Link>

      <Link href="/">
        <a
          href="/"
          className={
            cn(
              headerStyles.link, headerStyles.containerWithBigGap__item
            )
          }
        >
          Ваши заказы
        </a>
      </Link>

      <Link href="/">
        <a
          href="/"
          className={
            cn(
              headerStyles.link, headerStyles.containerWithBigGap__item
            )
          }
        >
          О нас
        </a>
      </Link>

      <div className={styles.footer}>
        <Link href="/">
          <a
            href="/"
            className={cn(
              headerStyles.link,
              headerStyles.link_small,
              headerStyles.containerWithGap__item
            )}
          >
            <LocationIcon className={cn(headerStyles.link__icon)} />
            <p className={cn(headerStyles.link__text)}>
              ул. Лапшова, 10-14, Татищево
            </p>
          </a>
        </Link>

        <button
          type="button"
          className={cn(
            headerStyles.link,
            headerStyles.link_small,
            headerStyles.link_number,
            headerStyles.containerWithGap__item
          )}
        >
          <PhoneIcon className={cn(headerStyles.link__icon)} />
          <p className={cn(headerStyles.link__text)}>{contactNumber}</p>
        </button>
      </div>
    </div>
  );
}
