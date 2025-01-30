import { createContext, useContext } from 'react';
import { Category, Product } from '../../types/serverTypes';

type ProductsContextProps = {
  currentProducts: Product[];
  catigories: Category[];
  fetchProducts: () => void;
  editProduct: (id: string, updatedProduct: Partial<Product>) => void;
};

export const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export default useProducts;
