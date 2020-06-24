import React from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { red } from '@material-ui/core/colors';
import { connect, ConnectedProps } from 'react-redux';
import { Product } from '../../interfaces/Product';
import { AppDispatch } from '../../redux/types';
import { addToFavoritesAction } from '../../redux/user/actions/addToFavoritesAction';
import { removeFromFavoritesAction } from '../../redux/user/actions/removeFromFavoritesAction';

export interface AddToFavoritesButtonProps {
  product: Product;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = AddToFavoritesButtonProps & PropsFromRedux;

export function AddToFavoritesButton({
  product,
  addToFavorites,
  removeFromFavorites
}: Props) {
  const toggleFavorites = () => {
    if (product.inFavorites) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };
  
  return (
    <IconButton onClick={toggleFavorites}>
      <FavoriteIcon fontSize='large' style={{ color: product.inFavorites ? red[500] : null }} />
    </IconButton>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToFavorites: (product) => dispatch(addToFavoritesAction(product)),
  removeFromFavorites: (product) => dispatch(removeFromFavoritesAction(product))
});

const connector = connect(null, mapDispatchToProps);

export default connector(AddToFavoritesButton);