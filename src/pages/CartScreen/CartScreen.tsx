import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'clsx';
import styles from './CartScreen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import ComponentFetchList from '../../shared/ui/ComponentFetchList/ComponentFetchList';
import CartItem from '../../features/Cart/ui/CartItem/CartItem';
import { AppDispatch, RootState } from '../../app/store/store';
import { clearCart, setQuantity } from '../../features/Cart/model/slice';
import { MutateOrderBody, MutateOrderProduct, OrderStatus, Product } from '../../shared/types/serverTypes';
import Button from '../../shared/ui/Button/Button';
import { createOrder } from '../../entities/Order/model/thunks';
import { CartEntry } from 'src/entities/Cart/model/types';

const CartScreen: React.FC = () => {
  const { t } = useTranslation();
  const items = useSelector((state: RootState) => state.cart.currentCartEntries);
  const createOrderStatus = useSelector((state: RootState) => state.cart.createOrderStatus);
  const createOrdreError = useSelector((state: RootState) => state.cart.createOrdreError);
  const dispatch: AppDispatch = useDispatch();

  const handleIncrement = useCallback(
    (product: Product, count: number) => {
      dispatch(setQuantity({ product, quantity: count + 1 }));
    },
    [dispatch]
  );

  const handleDecrement = useCallback(
    (product: Product, count: number) => {
      dispatch(setQuantity({ product, quantity: count - 1 }));
    },
    [dispatch]
  );

  const handleInputChange = useCallback(
    (product: Product, count: number) => {
      dispatch(setQuantity({ product, quantity: count }));
    },
    [dispatch]
  );

  const renderCallback = useCallback(
    (item: CartEntry) => (
      <div key={item.product.id}>
        <CartItem
          name={item.product.name}
          price={item.product.price}
          photo={item.product.photo}
          count={item.quantity}
          onIncrement={() => handleIncrement(item.product, item.quantity)}
          onDecrement={() => handleDecrement(item.product, item.quantity)}
          onInputChange={(count) => handleInputChange(item.product, count)}
        />
      </div>
    ),
    []
  );

  const handleCreateOrderClick = useCallback(() => {
    const orderProducts: MutateOrderProduct[] = items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    const order: MutateOrderBody = {
      products: orderProducts,
      status: OrderStatus.PendingConfirmation,
    };
    dispatch(createOrder(order));
    /* do nothing */
  }, [items, dispatch]);

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (createOrderStatus === 'succeeded') {
      dispatch(clearCart());
    }
  }, [createOrderStatus, dispatch]);

  if (items.length === 0) {
    return <div>{t('CartScreen.emptyCart')}</div>;
  }

  if (createOrderStatus === 'loading') {
    return <div>{t('CartScreen.loading')}</div>;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.header}></div>
      <div className={styles.content}>
        <ComponentFetchList
          items={items}
          doFetch={() => {
            /* do nothing */
          }}
          render={renderCallback}
          oneObserve={true}
        />
      </div>
      <div className={cn(styles.footer)}>
        <div className={styles.error}>
          {createOrdreError && (createOrdreError as string[]).map((str) => t(str)).join('\n')}
        </div>
        {/* {createOrdreError && <div className={styles.error}>{(createOrdreError as string[]).map((str) => t(str)).join('\n')}</div>} */}
        <div className={cn(styles.orderWrapper)}>
          <div className={cn(styles.totalTitle)}>
            <span>{t('CartScreen.totalTitle')}</span>
          </div>
          <div className={cn(styles.total)}>
            <span>{t('CartScreen.total', { total })}</span>
          </div>
          <Button
            className={styles.button}
            lable={t('CartScreen.checkoutButton')}
            onClick={handleCreateOrderClick}
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
