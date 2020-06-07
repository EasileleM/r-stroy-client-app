import React from 'react';
import { IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { red } from '@material-ui/core/colors';

export interface AddToFavoritesButtonProps {
  handleClick: () => void;
  active: boolean;
}

export function AddToFavoritesButton({
  handleClick,
  active
}: AddToFavoritesButtonProps) {
  return (
    <IconButton onClick={handleClick}>
      <FavoriteIcon fontSize='large' style={{ color: active ? red[500] : null }} />
    </IconButton>
  );
}
