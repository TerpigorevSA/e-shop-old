import React, { memo } from 'react';
import cn from 'clsx';
import styles from './OperationItem.module.css';
import cutStringHelper from '../../../../shared/lib/cutStringHelper';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../../shared/types/serverTypes';
import { Operation } from '../../models/types/operation';

type OperationItemProps = Pick<Operation, 'amount' | 'desc' | 'name'> & {
  categoryName: Category['name'];
};

const OperationItem: React.FC<OperationItemProps> = ({ name, categoryName, desc, amount }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.infoWrapper)}>
        <span className={cn(styles.name)}>{name}</span>
        <span className={cn(styles.category)}>{categoryName}</span>
      </div>
      <div className={cn(styles.description)}>{cutStringHelper(desc, 100) || t('operation.description_undefined')}</div>
      <div className={cn(styles.total)} style={{ color: amount >= 0 ? 'green' : 'red' }}>
        {t('operation.amount', { amount })}
      </div>
    </div>
  );
};

export default memo(OperationItem) as typeof OperationItem;
