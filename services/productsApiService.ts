import axios from 'axios';
import { Filters } from '../interfaces/Filters';
import { Product } from '../interfaces/Product';
import { Pagination } from '../interfaces/Pagination';
import { GET_FILTERS_URL, GET_PRODUCTS_URL } from '../contants/const';
import { serializeParams } from '../serializers/serializeParams';
import { deserializeProducts } from '../deserializers/deserializeProducts';

export class ProductsApiService {
  /**
   * Fetches initial filters.
   */
  async getFilters(): Promise<Filters> {
    const { data } = await axios.get(GET_FILTERS_URL);

    data.types = data.types.map(type => type.name);

    return data;
  }

  /**
   * Fetched products with given appliedFilters and searchQuery.
   *
   * @param appliedFilters
   * @param searchQuery
   * @param currentPage
   */
  async getProducts(
    appliedFilters: Filters, searchQuery: string, currentPage: number
  ): Promise<Pagination> {
    const { data } = await axios.get(
      GET_PRODUCTS_URL,
      {
        params: {
          search: searchQuery,
          page: currentPage - 1,
          maxPrice: appliedFilters.highestPrice,
          minPrice: appliedFilters.lowestPrice,
          type: appliedFilters.types
        },
        paramsSerializer: serializeParams
      }
    );

    return {
      products: deserializeProducts(data.content),
      pagesAmount: data.totalPages
    };
  }

  /**
   *
   * @param idArray
   */
  async getProductsById(
    idArray: Array<string>
  ): Promise<Array<Product>> {
    const { data } = await axios.get(
      GET_PRODUCTS_URL,
      {
        params: {
          id: idArray
        },
        paramsSerializer: serializeParams
      }
    );

    return deserializeProducts(data);
  }
}

export const productsApiService = new ProductsApiService();