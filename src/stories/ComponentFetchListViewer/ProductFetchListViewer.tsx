import React, { FC, useCallback, useState } from 'react';

import { createRandomProduct, getRandomDate } from '../../shared/lib/fakeGenerators/fakeGenerators';
import ProductItem from '../../entities/Product/ui/ProductItem/ProductItem';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { Product } from '../../shared/types/serverTypes';

const ProductFetchListViewer: FC = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }).map(() =>
      createRandomProduct(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')))
    )
  );

  const fetchItems = useCallback(() => {
    setItems([
      ...items,
      ...Array.from({ length: 20 }).map(() =>
        createRandomProduct(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')))
      ),
    ]);
  }, [items]);

  const renderCallback = useCallback(
    (item: Product) => (
      <div key={item.id}>
        <ProductItem name={item.name} desc={item.desc} price={item.price} photo={item.photo} />
      </div>
    ),
    []
  );

  return (
    <>
      <ComponentFetchList items={items} doFetch={fetchItems} render={renderCallback} oneObserve={true} />
    </>
  );
};

export default ProductFetchListViewer;
