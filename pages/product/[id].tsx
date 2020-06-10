import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Layout } from '../../components/Layout/Layout';
import { productsApiService } from '../../services/productsApiService';
import { Product } from '../../interfaces/Product';
import ProductCard from '../../components/ProductCard/ProductCard';
import { RootState } from '../../redux/types';

export interface ProductPageProps {
  product: Product
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = ProductPageProps & PropsFromRedux;

export function ProductPage({
  product,
  favoritesProducts
}: Props) {
  const [currentProduct, setCurrentProduct] = useState(product);

  useEffect(() => {
    setCurrentProduct({
      ...currentProduct,
      inFavorites:
        Boolean(favoritesProducts.find(({ id }) => id === currentProduct.id ))
    });
  }, [favoritesProducts]);

  return (
    <Layout>
      <ProductCard wide product={currentProduct} />
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const [product] = await productsApiService.getProductsById([id]);
  
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