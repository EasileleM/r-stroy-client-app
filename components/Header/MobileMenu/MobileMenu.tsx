import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './MobileMenu.module.scss';
import headerStyles from '../Header.module.scss';

import { Search } from '../../Search/Search';
import { Number } from '../../Number/Number';
import { LocationLink } from '../LocationLink/LocationLink';

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

      <Link href="/catalog">
        <a
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
        <LocationLink />

        <Number
          containerStyles={
            cn(
              headerStyles.link,
              headerStyles.link_small,
              headerStyles.link_number,
              headerStyles.containerWithGap__item
            )
          }
          iconStyles={headerStyles.link__icon}
          textStyles={headerStyles.link__text}
        />
      </div>
    </div>
  );
}
