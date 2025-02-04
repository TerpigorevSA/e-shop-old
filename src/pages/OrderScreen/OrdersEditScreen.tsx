import React, { useCallback, useState } from 'react';
import cn from 'clsx';
import styles from './OrdersEditScreen.module.css';
import { MutateOrderBody, Order, OrdersFilters, OrderStatus } from '../../shared/types/serverTypes';
import OrderProductItem from '../../entities/Product/ui/OrderProductItem/OrderProductItem';
import ComponentFetchList from 'src/shared/ui/ComponentFetchList/ComponentFetchList';
import useDataListController from '../../shared/hooks/useDataListController';
import EditOrderItem from 'src/entities/Order/ui/EditOrderItem/EditOrderItem';
import { useCreateOrderMutation, useGetOrdersQuery, useUpdateOrderMutation } from '../../entities/Order/api/orderApi';
import PageLayout from '../../shared/ui/PageLayout/PageLayout';
import OrdersFiltersForm from './OrdersFiltersForm/OrdersFiltersForm';

const OrdersEditScreen: React.FC = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const { items, currentFilters, handlerFiltersChange, handlerFetchItems, handlerEditItem } = useDataListController<
    Order,
    OrdersFilters,
    MutateOrderBody
  >(useGetOrdersQuery, useUpdateOrderMutation, useCreateOrderMutation);

  const handlerStatusChange = useCallback(
    (status: OrderStatus, item: Order) => {
      const oldItem = items.find((i) => i.id === item.id);
      if (oldItem) {
        const body: MutateOrderBody = {
          status: status,
          products: oldItem.products.map((product) => ({ id: product.product.id, quantity: product.quantity })),
        };
        handlerEditItem(item.id, body);
      }
    },
    [items]
  );

  const renderCallback = useCallback(
    (item: Order) => (
      <div
        className={cn({ [styles.selectedOrder]: currentOrder === item })}
        key={item.id}
        onClick={() => handleClick(item)}
      >
        <EditOrderItem
          createdAt={item.createdAt}
          updatedAt={item.updatedAt}
          status={item.status}
          totalPrice={item.products.reduce((total, product) => total + product.product.price * product.quantity, 0)}
          id={item.id}
          email={item.user.name}
          onStatusChange={(status: OrderStatus) => handlerStatusChange(status, item)}
        />
      </div>
    ),
    [currentOrder]
  );

  const handleClick = (order: Order) => {
    setCurrentOrder((prev) => (prev === order ? null : order));
  };

  return (
    <>
      <PageLayout
        header={<></>}
        footer={<></>}
        sidebar={<OrdersFiltersForm initialFilters={currentFilters} onChange={handlerFiltersChange} />}
      >
        <div className={styles.content}>
          <div className={styles.orders}>
            <ComponentFetchList doFetch={handlerFetchItems} items={items} render={renderCallback} oneObserve={true} />
          </div>
          <div className={styles.products}>
            {currentOrder &&
              currentOrder.products.map((item) => (
                <div key={item._id}>
                  <OrderProductItem
                    photo={item.product.photo}
                    name={item.product.name}
                    price={item.product.price}
                    quantity={item.quantity}
                  />
                </div>
              ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default OrdersEditScreen;
