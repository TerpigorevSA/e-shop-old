import React, { memo } from 'react';
import styles from './OrderProductItem.module.css';
import { useTranslation } from 'react-i18next';

type OrderProductItemProps = {
  photo: string;
  name: string;
  price: number;
  quantity: number;
};

const OrderProductItem: React.FC<OrderProductItemProps> = ({ photo, name, price, quantity }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.orderProductItem}>
      <img src={photo} alt={name} className={styles.thumbnail} />
      <div className={styles.details}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{t('OrderProductItem.price', { price })}</span>
        <span className={styles.quantity}>{t('OrderProductItem.quantity', { quantity })}</span>
      </div>
    </div>
  );
};

export default memo(OrderProductItem) as typeof OrderProductItem;
