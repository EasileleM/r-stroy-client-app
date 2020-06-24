export interface Product {
  id: string;
  name: string;
  description: string;
  types: Array<string>;
  amount: number;
  price: number;
  imageURL: string;
  inFavorites: boolean;
}