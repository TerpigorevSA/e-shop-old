import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import styles from './OrdersEditScreen.module.css';
import { useTranslation } from 'react-i18next';
import { AppDispatch, RootState } from '../../app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Order, OrderStatus } from '../../shared/types/serverTypes';
import OrderProductItem from '../../entities/Product/ui/OrderProductItem/OrderProductItem';
import ComponentFetchList from 'src/shared/ui/ComponentFetchList/ComponentFetchList';
import EditOrderItem from 'src/entities/Order/ui/EditOrderItem/EditOrderItem';
import { getPartOrders, updatePartOrder } from 'src/entities/Order/model/thunks';

const OrdersEditScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.user.currentUser?.id);

  const itemsEmpty = useSelector((state: RootState) => state.orders.orders).length === 0;
  const firstRender = useRef(true);

  useEffect(() => {
    if (userId) {
      if (itemsEmpty && firstRender.current) {
        dispatch(getPartOrders({ pagination: { pageSize: 10, pageNumber: 1 } }));
      }
      firstRender.current = false;
    }
  }, [userId]);

  const items = useSelector((state: RootState) => state.orders.orders);
  const currentOrderStatus = useSelector((state: RootState) => state.orders.status);
  const currentOrderError = useSelector((state: RootState) => state.orders.error);
  const pagination = useSelector((state: RootState) => state.orders.pagination);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const pageTotal = Math.ceil(pagination.total / pagination.pageSize);

  const handleFetchOrders = useCallback(() => {
    if (
      pagination.pageNumber !== pageTotal &&
      pagination.pageNumber !== 0 &&
      currentOrderStatus !== 'loading' &&
      currentOrderStatus !== 'failed'
    ) {
      dispatch(getPartOrders({ pagination: { pageSize: 10, pageNumber: pagination.pageNumber + 1 } }));
    }
  }, [dispatch, pagination, pageTotal, currentOrderStatus]);

  const handleStatusChange = useCallback((status: OrderStatus, item: Order) => {
    dispatch(updatePartOrder({ id: item.id, body: { status: status } }));
  }, []);

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
          onStatusChange={(status: OrderStatus) => handleStatusChange(status, item)}
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
      <div className={styles.wrapper}>
        <div className={styles.header}></div>
        <div className={styles.content}>
          <div className={styles.orders}>
            <ComponentFetchList doFetch={handleFetchOrders} items={items} render={renderCallback} oneObserve={true} />
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
        <div className={cn(styles.footer)}>
          <div className={styles.error}>
            {currentOrderError && (currentOrderError as string[]).map((str) => t(str)).join('\n')}
          </div>
          {/* {currentOrderStatus === 'loading' && <div>{t('CartScreen.loading')}</div>} */}
        </div>
      </div>
    </>
  );
};

export default OrdersEditScreen;
