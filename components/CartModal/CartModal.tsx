import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import { RootState } from '../../redux/types';
import CartProductCard from '../CartProductCard/CartProductCard';
import { CREATE_ORDER_URL } from '../../contants/const';
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

export interface CartModalProps {
  isOpened: boolean;
  handleClose: () => void;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CartModalProps & PropsFromRedux;

export function CartModal({ isOpened, handleClose, products, isGuest }: Props) {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (products.length === 0) {
      handleClose();
    }
  }, [products]);

  const handleNewOrder = async () => {
    handleClose();

    if (!isGuest) {
      await router.push(CREATE_ORDER_URL);
    }
  };

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
            Корзина
          </Typography>
          <Button onClick={handleNewOrder} autoFocus color="inherit">
            {`Сумма: ${
              products.reduce((totalValue, product) => {
                return totalValue + product.price * product.amountInCart;
              }, 0).toFixed(2)
            } руб. ${
              isGuest ?
                'Войдите, чтобы оформить заказ'
                :
                'Оформить заказ'
            }`}
          </Button>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
      >
        {
          products.map(product => {
            return (
              <Grid item key={product.id}>
                <CartProductCard product={product} />
              </Grid>
            );
          })
        }
      </Grid>
    </Dialog>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.user.cartProducts,
  isGuest: state.user.isGuest
});

const connector = connect(mapStateToProps);

export default connector(CartModal);