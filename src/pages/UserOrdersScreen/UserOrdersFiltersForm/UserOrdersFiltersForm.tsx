import { OrdersFilters, OrderStatus } from 'src/shared/types/serverTypes';
import React from 'react';
import cn from 'clsx';
import styles from './UserOrdersFiltersForm.module.css';
import { orderFilterSchema } from 'src/entities/Order/model/OrderFilterSchema';
import { useTranslation } from 'react-i18next';
import { CommonFiltersForm } from '../../../features/forms/CommonFiltersForm/CommonFiltersForm';

type UserOrdersFiltersFormProps = {
  initialFilters: OrdersFilters;
  onChange: (filters: OrdersFilters) => void;
};
const UserOrdersFiltersForm = ({ initialFilters, onChange }: UserOrdersFiltersFormProps) => {
  const { t } = useTranslation();

  return (
    <CommonFiltersForm initialFilters={initialFilters} childrenSchema={orderFilterSchema} onChange={onChange}>
      {(
        errors: Record<string, string>,
        filters: OrdersFilters,
        handleChange: <K extends keyof OrdersFilters>(key: K, value: OrdersFilters[K]) => void
      ) => (
        <div>
          <label className={cn(styles.label)}>{t('UserOrdersFiltersForm.status.label')}
            <select
              className={cn(styles.select)}
              value={filters?.status || ''}
              onChange={(e) =>
                handleChange(
                  'status',
                  e.target.value
                    ? e.target.value as OrderStatus
                    : undefined
                )
              }
            >
              <option value="">{t('UserOrdersFiltersForm.status.noStatus')}</option>
              <option value={OrderStatus.Delivered}>{t('OrderStatus.delivered')}</option>
              <option value={OrderStatus.InTransit}>{t('OrderStatus.in_transit')}</option>
              <option value={OrderStatus.OrderCancelled}>{t('OrderStatus.order_cancelled')}</option>
              <option value={OrderStatus.Packaging}>{t('OrderStatus.packaging')}</option>
              <option value={OrderStatus.PendingConfirmation}>{t('OrderStatus.pending_confirmation')}</option>
              <option value={OrderStatus.Processing}>{t('OrderStatus.processing')}</option>
              <option value={OrderStatus.ReturnRequested}>{t('OrderStatus.return_requested')}</option>
              <option value={OrderStatus.WaitingForDelivery}>{t('OrderStatus.waiting_for_delivery')}</option>
            </select>
          </label>
          {errors['status'] && <p className={cn(styles.error)}>{t(errors['status'])}</p>}
        </div>
      )}
    </CommonFiltersForm>
  );
};

export default UserOrdersFiltersForm;
