import React from 'react';
import { Button } from '@material-ui/core';


export interface AddToCartButtonProps {
  handleClick: () => void;
}

export function AddToCartButton({
  handleClick
}: AddToCartButtonProps) {
  return (
    <Button onClick={handleClick}>
      В Корзину
    </Button>
  );
}
