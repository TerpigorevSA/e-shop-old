import React, { useState, useCallback } from 'react';
import { createRandomProduct, getCategories, getRandomDate } from '../../lib/fakeGenerators/fakeGenerators';
import { ProductsContext } from '../../contexts/ProductsContext/ProductsContext';
import { Product } from '../../types/serverTypes';

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProducts, setCurrentProducts] = useState(
    Array.from({ length: 20 }).map(() =>
      createRandomProduct(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')))
    )
  );

  const fetchProducts = useCallback(() => {
    setCurrentProducts([
      ...currentProducts,
      ...Array.from({ length: 20 }).map(() =>
        createRandomProduct(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')))
      ),
    ]);
  }, [currentProducts]);

  const editProduct = useCallback((id: string, updatedProduct: Partial<Product>) => {
    setCurrentProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product))
    );
  }, []);

  const [catigories] = useState(getCategories());

  return (
    <ProductsContext.Provider value={{ currentProducts, fetchProducts, editProduct, catigories }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
