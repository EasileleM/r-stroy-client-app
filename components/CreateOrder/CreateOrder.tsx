import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';

import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { AppDispatch, RootState } from '../../redux/types';
import { INDEX_URL } from '../../contants/const';
import { OrderProductCard } from '../OrderProductCard/OrderProductCard';
import { userApiService } from '../../services/userApiService';
import { createOrderScheme } from '../../schemes/createOrderScheme';
import { cleanCartAction } from '../../redux/user/actions/cleanCartAction';
import { createOrderAction } from '../../redux/user/actions/createOrderAction';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export interface CreateOrderProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = CreateOrderProps & PropsFromRedux;

export function CreateOrder({
  className,
  cartProducts,
  isGuest,
  clearCart,
  createOrder
}: Props
) {
  const router = useRouter();
  const classes = useStyles();
  const [orderProducts, setOrderProducts] = useState([]);
  const [isDataSettled, setIsDataSettled] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => setIsComponentMounted(true), []);

  useEffect(() => {
    setIsDataSettled(true);
    setOrderProducts(cartProducts.map(product => {
      const newProduct = {
        ...product,
        amountInOrder: product.amountInCart
      };
      delete newProduct.amountInCart;
      return newProduct;
    }));
  }, []);

  useEffect(() => {
    if (orderProducts.length === 0 && isDataSettled) {
      router.push(INDEX_URL);
    }
  }, [orderProducts]);

  const onSubmit = async (data, { setStatus, setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const newOrderData = {
        ...data,
        products: orderProducts
      };

      const { data: orderId } = await userApiService.createOrder(newOrderData);
      clearCart();
      createOrder({
        ...newOrderData,
        id: orderId
      });
      setSubmissionSuccess(true);
    } catch (e) {
      if (e.response.status === 409 || e.response.status === 400) {
        setStatus(e.response.data);
      } else {
        throw e;
      }
    }
    setIsSubmitting(false);
    setSubmitting(false);
  };

  const handleChangeProductAmount = (product, amount) => {
    const newOrderProducts = [...orderProducts];
    const targetIndex =
      newOrderProducts.findIndex(({ id }) => product.id === id);
    newOrderProducts[targetIndex] = { ...product, amountInOrder: amount };
    setOrderProducts(newOrderProducts);
  };

  const handleRemoveProduct = (product) => {
    const newOrderProducts = [...orderProducts];
    const targetIndex =
      newOrderProducts.findIndex(({ id }) => product.id === id);
    newOrderProducts.splice(targetIndex, 1);
    setOrderProducts(newOrderProducts);
  };

  if (!isComponentMounted) {
    return null;
  }

  if (isGuest) {
    return <p>Войдите, чтобы создать заказ</p>;
  }

  return (
    <div className={cn(className)}>
      {
        submissionSuccess ?
          <Typography variant="h6">
            Заказ успешно оформлен!
          </Typography>
          :
          <>
            <Typography variant="h6">
              Оформление Заказа
            </Typography>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              {
                orderProducts.map(product => {
                  return (
                    <Grid item key={product.id}>
                      <OrderProductCard
                        changeable
                        changeAmount={handleChangeProductAmount}
                        removeFromOrder={handleRemoveProduct}
                        amount={product.amountInOrder}
                        product={product}
                      />
                    </Grid>
                  );
                })
              }
            </Grid>
            <Typography variant="h6">
              Сумма:
              {
                Number(orderProducts.reduce((totalValue, product) => {
                  return totalValue + product.price * product.amountInOrder;
                }, 0)).toFixed(2)
              }
              руб.
            </Typography>
            <Formik
              validationSchema={createOrderScheme}
              onSubmit={onSubmit}
              initialValues={{
                city: '',
                street: '',
                house: '',
                description: ''
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
                status
              }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                  <Typography>Доставка возможно только в города России.</Typography>
                  <TextField
                    autoComplete="city"
                    name="city"
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="Город"
                    autoFocus
                    value={values.city}
                    onChange={handleChange}
                  />
                  {
                    (touched.city && errors.city &&
                    <Typography color='error'>{errors.city}</Typography>)
                    || (!!status && status.city &&
                    <Typography color='error'>{status.city}</Typography>)
                  }
                  <TextField
                    autoComplete="street"
                    name="street"
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="street"
                    label="Улица"
                    value={values.street}
                    onChange={handleChange}
                  />
                  {
                    (touched.street && errors.street &&
                    <Typography color='error'>{errors.street}</Typography>)
                    || (!!status && status.street &&
                    <Typography color='error'>{status.street}</Typography>)
                  }
                  <TextField
                    autoComplete="house"
                    name="house"
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                    id="house"
                    label="Дом"
                    value={values.house}
                    onChange={handleChange}
                  />
                  {
                    (touched.house && errors.house &&
                    <Typography color='error'>{errors.house}</Typography>)
                    || (!!status && status.house &&
                    <Typography color='error'>{status.house}</Typography>)
                  }
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Комментарий"
                    multiline
                    name="description"
                    autoComplete="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  {
                    (touched.description && errors.description &&
                    <Typography color='error'>{errors.description}</Typography>)
                    || (!!status && status.description &&
                    <Typography color='error'>{status.description}</Typography>)
                  }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                    {
                      isSubmitting && <CircularProgress />
                    }
                    Оформить
                  </Button>
                </form>
              )}
            </Formik>
          </>
      }
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  cartProducts: state.user.cartProducts,
  isGuest: state.user.isGuest
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  clearCart: () => dispatch(cleanCartAction()),
  createOrder: (order) => dispatch(createOrderAction(order))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CreateOrder);