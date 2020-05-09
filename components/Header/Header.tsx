import React, { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './Header.module.scss';
import { CartButton } from './CartButton/CartButton';
import { FavoritesButton } from './FavoritesButton/FavoritesButton';
import { ProfileButton } from './ProfileButton/ProfileButton';
import { Search } from '../Search/Search';

import PhoneIcon from '../../public/images/phone.svg';
import LocationIcon from '../../public/images/location.svg';

import { contactNumber } from '../../contants/const';

import useResponsive from '../../hooks/useResponsive';
import { HamburgerMenuButton } from '../HamburgerMenuButton/HamburgerMenuButton';

export function Header() {
  const device = useResponsive();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <header className={styles.header}>
      {
        !device.isMobile &&
        <div className={cn(styles.row, styles.row_upper)}>
          <nav className={styles.row__content}>
            <div
              className={cn(styles.containerWithGap, styles.alignItemsCenter)}
            >
              <Link href="/">
                <a
                  href="/"
                  className={cn(
                    styles.link,
                    styles.link_small,
                    styles.containerWithGap__item
                  )}
                >
                  <LocationIcon className={cn(styles.link__icon)} />
                  <p className={cn(styles.link__text)}>
                    ул. Лапшова, 10-14, Татищево
                  </p>
                </a>
              </Link>
              <button
                type="button"
                className={cn(
                  styles.link,
                  styles.link_small,
                  styles.link_number,
                  styles.containerWithGap__item
                )}
              >
                <PhoneIcon className={cn(styles.link__icon)} />
                <p className={cn(styles.link__text)}>{contactNumber}</p>
              </button>
            </div>

            <div 
              className={cn(styles.containerWithGap, styles.alignItemsCenter)}
            >
              <FavoritesButton
                containerStyles={cn(
                  styles.link,
                  styles.link_small,
                  styles.containerWithGap__item
                )}
              />
              <CartButton
                containerStyles={cn(
                  styles.link,
                  styles.link_small,
                  styles.containerWithGap__item
                )}
              />
              <ProfileButton />
            </div>
          </nav>
        </div>
      }

      <div className={cn(styles.row, styles.row_lower)}>
        <nav
          className={cn(
            styles.row__content,
            styles.containerWithBigGap,
            styles.alignItemsCenter
          )}
        >
          <Link href="/">
            <a
              href="/"
              className={cn(styles.logo, styles.containerWithBigGap__item)}
            >
              Р-строй
            </a>
          </Link>
          
          {
            device.isMobile &&
              <>
                <FavoritesButton
                  containerStyles={cn(styles.containerWithBigGap__item)}
                />
                <CartButton
                  containerStyles={cn(styles.containerWithBigGap__item)}
                />
                <ProfileButton />
                <HamburgerMenuButton
                  toggleMenu={() => setMenuOpened(!menuOpened)}
                  containerStyles={cn(styles.containerWithBigGap__item)}
                />
              </>
          }

          {
            !device.isMobile &&
            <>
              <Search styleClass={cn(styles.containerWithBigGap__item)} />

              <Link href="/">
                <a
                  href="/"
                  className={cn(styles.link, styles.containerWithBigGap__item)}
                >
                  Каталог
                </a>
              </Link>

              <Link href="/">
                <a
                  href="/"
                  className={cn(styles.link, styles.containerWithBigGap__item)}
                >
                  Доставка
                </a>
              </Link>

              <Link href="/">
                <a
                  href="/"
                  className={cn(styles.link, styles.containerWithBigGap__item)}
                >
                  Ваши заказы
                </a>
              </Link>

              <Link href="/">
                <a
                  href="/"
                  className={cn(styles.link, styles.containerWithBigGap__item)}
                >
                  О нас
                </a>
              </Link>
            </>
          }
        </nav>
      </div>
    </header>
  );
}
