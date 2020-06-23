import { RawProductType } from './RawProductType';

export interface RawProduct {
  id: string;
  name: string;
  description: string;
  types: Array<RawProductType>;
  amount: number;
  price: number;
  imageURL: string;
  inFavorites: boolean;
}