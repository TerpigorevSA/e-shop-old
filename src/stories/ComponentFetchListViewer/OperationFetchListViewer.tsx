import React, { FC, useCallback, useState } from 'react';

import OperationItem from '../../entities/Operation/ui/OperationItem/OperationItem';
import { createRandomOperation, getRandomDate } from '../../shared/lib/fakeGenerators/fakeGenerators';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import { Operation } from '../../entities/Operation/models/types/operation';

const OperationFetchListViewer: FC = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }).map(() =>
      createRandomOperation(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')))
    )
  );

  const fetchItems = useCallback(() => {
    setItems([
      ...items,
      ...Array.from({ length: 20 }).map(() =>
        createRandomOperation(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')))
      ),
    ]);
  }, [items]);

  const renderCallback = useCallback(
    (item: Operation) => (
      <div key={item.id}>
        <OperationItem name={item.name} desc={item.desc} amount={item.amount} categoryName={item.category.name} />
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

export default OperationFetchListViewer;
