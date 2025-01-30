import { Product } from '../../../shared/types/serverTypes';

export type CartEntry = {
  product: Product;
  quantity: number;
};
