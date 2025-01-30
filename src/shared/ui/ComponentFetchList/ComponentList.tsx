import React, { useRef, useState } from 'react';
import useIntersectionObserve from '../../hooks/useIntersectionObserver';

type ComponentListProps<T> = React.HTMLAttributes<HTMLDivElement> & {
  items: T[];
  itemElement: React.ComponentType<T>;
};

type InfinityListVisibleItemType<T> = {
  index: number;
  value: T;
};

const ComponentList = <T,>({ items, itemElement: ItemElement }: ComponentListProps<T>) => {
  const addItemsCount = 20;

  const [visibleItemsCount, setVisibleItemsCount] = useState(addItemsCount);

  const [visibleItems, setVisibleItems] = useState<InfinityListVisibleItemType<T>[]>(() =>
    items.slice(0, visibleItemsCount).map((value, index) => ({ value, index }))
  );

  const onIntersect = () => {
    setVisibleItems([
      ...visibleItems,
      ...items
        .slice(visibleItemsCount, visibleItemsCount + addItemsCount)
        .map((value, index) => ({ value, index: index + visibleItemsCount })),
    ]);
    setVisibleItemsCount((prev) => prev + addItemsCount);
  };
  const targetRef = useRef<HTMLDivElement>(null);
  useIntersectionObserve(targetRef, onIntersect, { threshold: 0.5 });

  return (
    <>
      {visibleItems.map((item) => {
        return (
          <div ref={item.index === visibleItemsCount - 2 ? targetRef : null} key={item.index}>
            <ItemElement {...item.value} />
          </div>
        );
      })}
    </>
  );
};

export default ComponentList;
