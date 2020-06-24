import React, { useState } from 'react';
import cn from 'classnames';

import { connect, ConnectedProps } from 'react-redux';
import { toast } from 'react-toastify';
import styles from './FavoritesButton.module.scss';
import headerStyles from '../Header.module.scss';

import FavoritesActiveIcon from '../../../public/images/favoritesActive.svg';
import { RootState } from '../../../redux/types';
import FavoritesModal from '../../FavoritesModal/FavoritesModal';
import { FAVORITES_EMPTY_MSG } from '../../../contants/const';

export interface FavoritesButtonProps {
  containerStyles?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FavoritesButtonProps & PropsFromRedux;

export function FavoritesButton({ containerStyles, counter }: Props) {
  const [areFavoritesOpened, setAreFavoritesOpened] = useState(false);
  
  const handleFavoritesClose = () => setAreFavoritesOpened(false);

  const handleFavoritesOpen = () => setAreFavoritesOpened(true);
  
  const handleClick = () => {
    if (counter === 0) {
      toast.info(FAVORITES_EMPTY_MSG);
    } else {
      handleFavoritesOpen();
    }
  };
  
  return (
    <>
      <button
        type='button'
        onClick={handleClick}
        className={cn(headerStyles.specialButton, containerStyles)}
      >
        <FavoritesActiveIcon
          className={cn(headerStyles.link__icon, styles.icon)}
        />
        <div className={headerStyles.specialButton__counter}>
          {counter > 9 ? '9+' : counter}
        </div>
        <p className={headerStyles.specialButton__text}>Избранное</p>
      </button>
      <FavoritesModal
        isOpened={areFavoritesOpened}
        handleClose={handleFavoritesClose}
      />
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  counter: state.user.favoritesProducts.length
});

const connector = connect(mapStateToProps);

export default connector(FavoritesButton);