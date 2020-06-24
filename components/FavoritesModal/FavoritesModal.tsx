import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { RootState } from '../../redux/types';
import { ProductContainer } from '../ProductContainer/ProductContainer';
import { TransitionSlideDown } from '../TransitionSlideDown/TransitionSlideDown';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

export interface FavoritesModalProps {
  isOpened: boolean;
  handleClose: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FavoritesModalProps & PropsFromRedux;

export function FavoritesModal({ isOpened, handleClose, products }: Props) {
  const classes = useStyles();

  useEffect(() => {
    if (products.length === 0) {
      handleClose();
    }
  }, [products]);

  return (
    <Dialog
      fullScreen
      open={isOpened}
      onClose={handleClose}
      TransitionComponent={TransitionSlideDown}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Избранное
          </Typography>
        </Toolbar>
      </AppBar>
      <ProductContainer
        noProductsMessage='Нет избранных товаров!'
        products={products}
      />
    </Dialog>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.user.favoritesProducts
});

const connector = connect(mapStateToProps);

export default connector(FavoritesModal);