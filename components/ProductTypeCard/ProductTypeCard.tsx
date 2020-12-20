import React, { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';
import cn from 'classnames';
import TextField from '@material-ui/core/TextField';
import styles from './ProductTypeCard.module.scss';
import { RawProductType } from '../../interfaces/RawProductType';
import { productsApiService } from '../../services/productsApiService';

export interface ProductTypeCardProps {
  className?: string;
  reloadProductTypes: Function;
  data: RawProductType;
}

export function ProductTypeCard(
  {
    className,
    data,
    reloadProductTypes
  }: ProductTypeCardProps
) {
  const [currentName, setCurrentName] = useState(data.name);

  useEffect(() => {
    setCurrentName(data.name);
  }, [data]);

  const handleChange = (e) => {
    setCurrentName(e.target.value);
  };

  const handleSubmit = async () => {
    await productsApiService.updateProductType({
      ...data,
      name: currentName
    });
    reloadProductTypes();
  };

  return (
    <Card className={cn(styles.container, className)}>
      <CardActionArea className={cn(styles.productContent)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Категория {data.id}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions classes={{ root: styles.actions }}>
        <TextField
          className={cn(styles.textField)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={data.id}
          label="Название"
          name={data.id}
          autoComplete={data.id}
          autoFocus
          value={currentName}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>
          Изменить
        </Button>
      </CardActions>
    </Card>
  );
}