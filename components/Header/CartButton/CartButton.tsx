import React, { useState } from 'react';
import cn from 'classnames';

import { connect, ConnectedProps } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './CartButton.module.scss';
import headerStyles from '../Header.module.scss';

import CartIcon from '../../../public/images/cart.svg';
import { RootState } from '../../../redux/types';
import { CART_EMPTY_MSG } from '../../../contants/const';
import CartModal from '../../CartModal/CartModal';

export interface CartButtonProps {
  containerStyles?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CartButtonProps & PropsFromRedux;

export function CartButton({ containerStyles, counter }: Props) {
  const [isCartOpened, setIsCartOpened] = useState(false);

  const handleCartClose = () => setIsCartOpened(false);

  const handleCartOpen = () => setIsCartOpened(true);

  const handleClick = () => {
    if (counter === 0) {
      toast.info(CART_EMPTY_MSG);
    } else {
      handleCartOpen();
    }
  };

  return (
    <>
      <button
        className={cn(containerStyles, headerStyles.specialButton)}
        type='button'
        onClick={handleClick}
      >
        <CartIcon className={cn(headerStyles.link__icon, styles.icon)} />
        <div className={headerStyles.specialButton__counter}>
          {counter > 9 ? '9+' : counter}
        </div>
        <p className={headerStyles.specialButton__text}>Корзина</p>
      </button>
      <CartModal handleClose={handleCartClose} isOpened={isCartOpened} />
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  counter: state.user.cartProducts.length
});

const connector = connect(mapStateToProps);

export default connector(CartButton);