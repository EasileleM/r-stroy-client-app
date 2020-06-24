import axios from 'axios';
import { Filters } from '../interfaces/Filters';
import { Product } from '../interfaces/Product';
import { Pagination } from '../interfaces/Pagination';
import {
  CREATE_PRODUCT_API_URL,
  GET_FILTERS_API_URL,
  GET_PRODUCT_API_URL,
  GET_PRODUCTS_API_URL,
  PRODUCT_TYPES_API_URL,
  UPDATE_PRODUCT_API_URL
} from '../contants/const';
import { serializeParams } from '../serializers/serializeParams';
import { deserializeProducts } from '../deserializers/deserializeProducts';
import { RawProduct } from '../interfaces/RawProduct';
import { RawProductType } from '../interfaces/RawProductType';

axios.defaults.withCredentials = true;

export class ProductsApiService {
  /**
   * Fetches initial filters.
   */
  async getFilters(): Promise<Filters> {
    const { data } = await axios.get(GET_FILTERS_API_URL);

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
      GET_PRODUCTS_API_URL,
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
      GET_PRODUCTS_API_URL,
      {
        params: {
          id: idArray
        },
        paramsSerializer: serializeParams
      }
    );

    return deserializeProducts(data);
  }

  /**
   *
   * @param id
   */
  async getRawProductById(
    id: string
  ): Promise<RawProduct> {
    const { data } = await axios.get(`${GET_PRODUCT_API_URL}/${id}`);

    return data;
  }

  async getAllRawProductTypes(): Promise<Array<RawProductType>> {
    const { data } = await axios.get(PRODUCT_TYPES_API_URL);

    return data;
  }

  async updateProductType(data: RawProductType): Promise<void> {
    await axios.patch(PRODUCT_TYPES_API_URL, data);
  }

  async createProductType(data: RawProductType): Promise<void> {
    await axios.post(`${PRODUCT_TYPES_API_URL}`, data);
  }

  async updateProduct(product: RawProduct): Promise<void> {
    await axios.patch(UPDATE_PRODUCT_API_URL, product);
  }

  async createProduct(product: RawProduct): Promise<void> {
    await axios.post(CREATE_PRODUCT_API_URL, product);
  }
}

export const productsApiService = new ProductsApiService();