import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import headerStyles from '../Header.module.scss';
import LocationIcon from '../../../public/images/location.svg';

export function LocationLink() {
  return (
    <Link href="/">
      <a
        className={cn(
          headerStyles.link,
          headerStyles.link_small,
          headerStyles.containerWithGap__item
        )}
      >
        <LocationIcon className={headerStyles.link__icon} />
        <p className={headerStyles.link__text}>
          ул. Лапшова, 10-14, Татищево
        </p>
      </a>
    </Link>
  );
}
