import { Product } from '../interfaces/Product';

export function deserializeProducts(products): Array<Product>{
  const deserializedProducts = products.map(product => {
    return {
      ...product,
      types: product.types.map(type => type.name)
    };
  });

  return deserializedProducts;
}