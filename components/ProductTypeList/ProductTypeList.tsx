import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { RootState } from '../../redux/types';
import { INDEX_URL } from '../../contants/const';
import { productsApiService } from '../../services/productsApiService';
import { ProductTypeCard } from '../ProductTypeCard/ProductTypeCard';

type PropsFromRedux = ConnectedProps<typeof connector>;

export function ProductTypeList({ isAdmin }: PropsFromRedux){
  const router = useRouter();
  const [productTypes, setProductTypes] = useState([]);
  const [currentName, setCurrentName] = useState('');

  const handleChange = (e) => {
    setCurrentName(e.target.value);
  };
  
  useEffect(() => {
    reloadProductTypes();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      router.push(INDEX_URL);
    }
  }, [isAdmin]);

  const reloadProductTypes = async () => {
    const newProductTypes = await productsApiService.getAllRawProductTypes();
    setProductTypes(newProductTypes);
  };

  const createProduct = async () => {
    await productsApiService.createProductType({ name: currentName });
    return reloadProductTypes();
  };

  return (
    <div>
      <Typography gutterBottom component="h1" variant="h1">
        Категории товара
      </Typography>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="newProductType"
          label="Имя категории"
          name="newProductType"
          autoComplete="newProductType"
          autoFocus
          value={currentName}
          onChange={handleChange}
        />
        <Button onClick={createProduct}>
          Создать
        </Button>
      </div>

      {
        !productTypes.length &&
        <Typography component="h1" variant="h5">
          Нет категорий товаров!
        </Typography>
      }
      {
        productTypes
          .map(productType => {
            return (
              <ProductTypeCard
                key={productType.id}
                data={productType}
                reloadProductTypes={reloadProductTypes}
              />
            );
          })
      }
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAdmin: state.user.isAdmin
});

const connector = connect(mapStateToProps);

export default connector(ProductTypeList);