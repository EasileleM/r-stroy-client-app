import React, { useState } from 'react';
import cn from 'classnames';
import { connect, ConnectedProps } from 'react-redux';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia, Chip,
  CircularProgress, FormControl, Input, InputLabel, MenuItem, Select,
  Typography
} from '@material-ui/core';
import Link from 'next/link';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styles from './ProductCard.module.scss';

import { Product } from '../../interfaces/Product';
import { AppDispatch, RootState } from '../../redux/types';
import { addToCartAction } from '../../redux/user/actions/addToCartAction';
import AddToFavoritesButton from '../AddToFavoritesButton/AddToFavoritesButton';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { productsApiService } from '../../services/productsApiService';
import { RawProduct } from '../../interfaces/RawProduct';
import { RawProductType } from '../../interfaces/RawProductType';
import { shortString } from '../../utils/shortString';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface ProductCardProps {
  styleContainer?: string;
  wide?: boolean;
  readonly product: Product;
  rawProduct?: RawProduct;
  changeCurrentProduct?: Function;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProductCardProps & PropsFromRedux;

export function ProductCard({
  styleContainer,
  product,
  addToCart,
  wide,
  isAdmin,
  rawProduct,
  changeCurrentProduct
}: Props) {
  const [isChanging, setIsChanging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productTypes, setProductTypes] = useState(null);
  const [currentProductTypes, setCurrentProductTypes] = useState(null);
  const classes = useStyles();

  const toggleChanging = async () => {
    if (!isChanging && !productTypes) {
      const newProductTypes = await productsApiService.getAllRawProductTypes();
      setCurrentProductTypes(
        newProductTypes
          .filter(({ id }) => rawProduct.types.some((type) => type.id === id))
      );
      setProductTypes(newProductTypes);
    }
    setIsChanging(!isChanging);
  };

  const onSubmit = async (data, { setStatus, resetForm, setSubmitting }) => {
    setIsSubmitting(true);
    try {
      await productsApiService.updateProduct({
        ...data,
        types: data.productTypes,
        id: rawProduct.id
      });
      setIsChanging(false);
      resetForm();
      changeCurrentProduct({
        ...rawProduct,
        ...data,
        types: data.productTypes
      });
    } catch (e) {
      if (e.response.status === 400) {
        setStatus(e.response.data);
      } else {
        throw e;
      }
    }
    setIsSubmitting(false);
    setSubmitting(false);
  };

  return (
    <Card
      className={cn(styles.container, styleContainer, { [styles.wide]: wide })}
    >
      <Link href='/product/[id]' as={`/product/${product.id}`}>
        <a className={cn(styles.link)}>
          <CardActionArea
            className={cn({ [styles.outOfStock]: !product.amount })}
          >
            <CardMedia
              className={styles.image}
              image={product.imageURL}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {
                  wide ?
                    product.name
                    :
                    shortString(product.name)
                }
              </Typography>
              {
                wide &&
                <Typography variant="body2" color="textSecondary" component="p">
                  <span dangerouslySetInnerHTML={Object({ __html: product.description })} />
                </Typography>
              }
              {
                wide && Boolean(product.types.length) &&
                <Typography variant="body2" color="textSecondary" component="p">
                  Категории: {product.types.join(' ')}
                </Typography>
              }
              <Typography variant="body2" color="textSecondary" component="p">
                {product.amount}шт. на складе
              </Typography>
            </CardContent>
          </CardActionArea>
        </a>
      </Link>

      <CardActions classes={{ root: styles.actions }}>
        <div className={styles.priceAndFavoritesWrapper}>
          <p className={styles.price__text}>
            <span className={styles.price}>{product.price}</span>
            руб./шт.
          </p>
          <AddToFavoritesButton product={product} />
        </div>
        <AddToCartButton
          handleClick={
            () => addToCart({ ...product, amountInCart: 1 })
          }
        />
        {
          wide && isAdmin &&
          <Button onClick={toggleChanging}>
            { isChanging ? 'Отмена' : 'Изменить' }
          </Button>
        }
      </CardActions>
      {
        wide && isAdmin && isChanging &&
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            name: rawProduct.name,
            description: rawProduct.description,
            price: rawProduct.price,
            amount: rawProduct.amount,
            imageURL: rawProduct.imageURL,
            productTypes: currentProductTypes
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
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Название"
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
              {
                (touched.name && errors.name &&
                <Typography color='error'>{errors.name}</Typography>)
                || (!!status && status.email &&
                <Typography color='error'>{status.name}</Typography>)
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="description"
                label="Описание"
                id="description"
                multiline
                autoComplete="product-description"
                value={values.description}
                onChange={handleChange}
              />
              {
                (touched.description && errors.description &&
                <Typography color='error'>{errors.description}</Typography>)
                || (!!status && status.description &&
                <Typography color='error'>{status.description}</Typography>)
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="price"
                label="Цена"
                id="price"
                autoComplete="product-price"
                value={values.price}
                onChange={handleChange}
              />
              {
                (touched.price && errors.price &&
                <Typography color='error'>{errors.price}</Typography>)
                || (!!status && status.price &&
                <Typography color='error'>{status.price}</Typography>)
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="amount"
                label="Количество"
                id="amount"
                autoComplete="product-amount"
                value={values.amount}
                onChange={handleChange}
              />
              {
                (touched.amount && errors.amount &&
                <Typography color='error'>{errors.amount}</Typography>)
                || (!!status && status.amount &&
                <Typography color='error'>{status.amount}</Typography>)
              }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="imageURL"
                label="Ссылка на картинку"
                id="imageURL"
                autoComplete="product-amount"
                value={values.imageURL}
                onChange={handleChange}
              />
              {
                (touched.imageURL && errors.imageURL &&
                <Typography color='error'>{errors.imageURL}</Typography>)
                || (!!status && status.imageURL &&
                <Typography color='error'>{status.imageURL}</Typography>)
              }
              <FormControl className={classes.formControl}>
                <InputLabel>Chip</InputLabel>
                <Select
                  multiple
                  value={values.productTypes}
                  onChange={handleChange}
                  name="productTypes"
                  id="productTypes"
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {(selected as Array<RawProductType>).map((value) => (
                        <Chip
                          key={value.id}
                          label={value.name}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {productTypes.map((type) => (
                    <MenuItem
                      key={type.id}
                      value={type}
                    >
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className={classes.submit}
              >
                {
                  isSubmitting && <CircularProgress />
                }
                Подтвердить
              </Button>
            </form>
          )}
        </Formik>
      }
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ProductCard);