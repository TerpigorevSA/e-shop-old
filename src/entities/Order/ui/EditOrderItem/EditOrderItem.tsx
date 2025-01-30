import React, { memo } from 'react';
import styles from './EditOrderItem.module.css';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from 'src/shared/types/serverTypes';

type OrderItemProps = {
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  totalPrice: number;
  id: string;
  email: string;
  onStatusChange: (status: OrderStatus) => void;
};

const EditOrderItem: React.FC<OrderItemProps> = ({
  createdAt,
  updatedAt,
  status,
  totalPrice,
  id,
  email,
  onStatusChange,
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as OrderStatus);
  };

  return (
    <div className={styles.orderItem}>
      <div className={styles.row}>
        <span>{id}</span>
        <span>{email}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t('OrderItem.createdAt', { createdAt })}</span>
        <span className={styles.value}>{t('OrderItem.totalPrice', { totalPrice })}</span>
      </div>
      <div className={styles.row}>
        {/* <span className={styles.label}>{t('OrderItem.status', { status })}</span> */}
        <select value={status} onChange={handleChange} className={styles.statusSelect}>
          {Object.values(OrderStatus).map((statusKey) => (
            <option key={statusKey} value={statusKey}>
              {t(`OrderStatus.${statusKey}`)}
            </option>
          ))}
        </select>
        <span className={styles.value}>{t('OrderItem.updatedAt', { updatedAt })}</span>
      </div>
    </div>
  );
};

export default memo(EditOrderItem) as typeof EditOrderItem;
