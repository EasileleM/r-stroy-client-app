import React, { useState } from 'react';
import cn from 'classnames';

import styles from './HamburgerMenuButton.module.scss';

export interface HamburgerMenuButtonProps {
  toggleMenu: () => void,
  containerStyles?: string
}

// eslint-disable-next-line max-len
export function HamburgerMenuButton({ toggleMenu, containerStyles }: HamburgerMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleMenu();
  };

  return (
    <button onClick={handleClick} type='button' className={cn(styles.button, containerStyles)}>
      <div className={cn(styles.hamburger, { [styles.opened]: isOpen })} />
    </button>
  );
}
