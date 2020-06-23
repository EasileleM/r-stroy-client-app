import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  Button,
  Chip,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { RootState } from '../../redux/types';
import { CATALOG_URL, INDEX_URL } from '../../contants/const';
import { productsApiService } from '../../services/productsApiService';
import { RawProductType } from '../../interfaces/RawProductType';

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

type PropsFromRedux = ConnectedProps<typeof connector>;

export function CreateProduct({ isAdmin }: PropsFromRedux) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productTypes, setProductTypes] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    if (!isAdmin) {
      router.push(INDEX_URL);
    }
  }, [isAdmin]);

  useEffect(() => {
    productsApiService.getAllRawProductTypes()
      .then(data => setProductTypes(data));
  }, []);

  const onSubmit = async (data, { setStatus, setSubmitting }) => {
    setIsSubmitting(true);
    try {
      await productsApiService.createProduct({
        ...data,
        types: data.productTypes
      });
      await router.push(CATALOG_URL);
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
    productTypes &&
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        description: '',
        price: '',
        amount: '',
        imageURL: '',
        productTypes: []
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
  );
}

const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const connector = connect(mapStateToProps);

export default connector(CreateProduct);