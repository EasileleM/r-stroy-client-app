import React, { useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { connect, ConnectedProps } from 'react-redux';
import styles from './Header.module.scss';

import CartButton from './CartButton/CartButton';
import FavoritesButton from './FavoritesButton/FavoritesButton';
import ProfileButton from './ProfileButton/ProfileButton';
import Search from '../Search/Search';

import useResponsive from '../../hooks/useResponsive';
import { HamburgerMenuButton } from '../HamburgerMenuButton/HamburgerMenuButton';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { Number } from '../Number/Number';
import { LocationLink } from './LocationLink/LocationLink';
import {
  ALL_ORDERS_URL,
  CREATE_PRODUCT_URL,
  NOTIFY_SUBSCRIBERS_URL,
  ORDERS_URL,
  PRODUCT_TYPE_URL,
  ANALYTICS_URL
} from '../../contants/const';
import { RootState } from '../../redux/types';

type PropsFromRedux = ConnectedProps<typeof connector>;

export function Header({ isAdmin }: PropsFromRedux) {
  const device = useResponsive();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <header className={styles.header}>
        {
        !device.isMobile &&
        <div className={cn(styles.row, styles.row_upper)}>
          <nav className={styles.row__content}>
            <div
              className={cn(styles.containerWithGap, styles.alignItemsCenter)}
            >
              <LocationLink />
              <Number
                containerStyles={
                  cn(
                    styles.link,
                    styles.link_small,
                    styles.link_number,
                    styles.containerWithGap__item
                  )
                }
                iconStyles={styles.link__icon}
                textStyles={styles.link__text}
              />
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
              <ProfileButton
                containerStyles={cn(
                  styles.link,
                  styles.link_small,
                  styles.containerWithGap__item
                )}
              />
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
                <ProfileButton 
                  containerStyles={cn(styles.containerWithBigGap__item)}
                />
                <HamburgerMenuButton
                  toggleMenu={() => setMenuOpened(!menuOpened)}
                  containerStyles={cn(styles.containerWithBigGap__item)}
                />
              </>
          }

            {
            !device.isMobile &&
            <>
              <Search className={cn(styles.containerWithBigGap__item)} />

              <Link href="/catalog">
                <a
                  className={cn(styles.link, styles.containerWithBigGap__item)}
                >
                  Каталог
                </a>
              </Link>

              {
                !isAdmin &&
                <Link href="/">
                  <a
                    className={
                      cn(styles.link, styles.containerWithBigGap__item)
                    }
                  >
                    Доставка
                  </a>
                </Link>
              }
              {
                isAdmin &&
                  <>
                    <Link href={CREATE_PRODUCT_URL}>
                      <a
                        className={
                            cn(styles.link, styles.containerWithBigGap__item)
                          }
                      >
                        Новый продукт
                      </a>
                    </Link>
                    <Link href={PRODUCT_TYPE_URL}>
                      <a
                        className={
                                cn(
                                  styles.link,
                                  styles.containerWithBigGap__item
                                )
                              }
                      >
                        Категории
                      </a>
                    </Link>
                    <Link href={ALL_ORDERS_URL}>
                      <a
                        className={
                                cn(
                                  styles.link,
                                  styles.containerWithBigGap__item
                                )
                              }
                      >
                        Заказы
                      </a>
                    </Link>
                    <Link href={NOTIFY_SUBSCRIBERS_URL}>
                      <a
                        className={
                                cn(
                                  styles.link,
                                  styles.containerWithBigGap__item
                                )
                              }
                      >
                        Рассылка
                      </a>
                    </Link>
                    <Link href={ANALYTICS_URL}>
                      <a
                        className={
                                cn(
                                  styles.link,
                                  styles.containerWithBigGap__item
                                )
                              }
                      >
                        Аналитика
                      </a>
                    </Link>
                  </>
              }

              {
                !isAdmin && 
                  <>
                    <Link href="/">
                      <a
                        className={
                          cn(styles.link, styles.containerWithBigGap__item)
                        }
                      >
                        О нас
                      </a>
                    </Link>
                    <Link href={ORDERS_URL}>
                      <a
                        className={
                                cn(
                                  styles.link,
                                  styles.containerWithBigGap__item
                                )
                              }
                      >
                        Ваши заказы
                      </a>
                    </Link>
                  </>
              }
            </>
          }
          </nav>
        </div>
        {
          device.isMobile &&
          <MobileMenu opened={menuOpened} />
        }
      </header>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const connector = connect(mapStateToProps);

export default connector(Header);