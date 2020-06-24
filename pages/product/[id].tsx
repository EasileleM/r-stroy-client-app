import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import { productsApiService } from '../../services/productsApiService';
import ProductCard from '../../components/ProductCard/ProductCard';
import { RootState } from '../../redux/types';
import { RawProduct } from '../../interfaces/RawProduct';
import { deserializeProducts } from '../../deserializers/deserializeProducts';
import { Product } from '../../interfaces/Product';

export interface ProductPageProps {
  product: RawProduct
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProductPageProps & PropsFromRedux;

export function ProductPage({
  product,
  favoritesProducts
}: Props) {
  const [currentProduct, setCurrentProduct] =
    useState(deserializeProducts([product])[0]);

  useEffect(() => {
    setCurrentProduct(deserializeProducts([{
      ...product,
      inFavorites:
        Boolean(favoritesProducts.find(({ id }) => id === currentProduct.id ))
    }])[0]);
  }, [favoritesProducts, product]);

  const changeCurrentProduct = (newProduct: Product) => {
    setCurrentProduct(deserializeProducts([{
      ...newProduct,
      inFavorites:
        Boolean(favoritesProducts.find(({ id }) => id === currentProduct.id ))
    }])[0]);
  };

  return (
    <Layout>
      <ProductCard
        wide
        product={currentProduct}
        rawProduct={product}
        changeCurrentProduct={changeCurrentProduct}
      />
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const product = await productsApiService.getRawProductById(id);
  return {
    props: {
      product
    },
  };
}

const mapStateToProps = (state: RootState) => ({
  favoritesProducts: state.user.favoritesProducts
});

const connector = connect(mapStateToProps);

export default connector(ProductPage);