import React from 'react';
import cn from 'clsx';
import styles from './OperationDetail.module.css';
import Button from '../../../../shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../../shared/types/serverTypes';
import { Operation } from '../../models/types/operation';

type OperationDetailProps = Pick<Operation, 'amount' | 'createdAt' | 'desc' | 'name'> & {
  categoryName: Category['name'];
};

const OperationDetail: React.FC<OperationDetailProps> = ({ name, categoryName, createdAt, desc, amount }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(styles.wrapper)}>
      <div className={cn(styles.mainWrapper)}>
        <div className={cn(styles.createAt)}>{createdAt}</div>
        <div className={cn(styles.total)} style={{ color: amount >= 0 ? 'green' : 'red' }}>
          {t('operation.amount', { amount })}
        </div>
      </div>
      <span className={cn(styles.name)}>{name}</span>
      <span className={cn(styles.category)}>{categoryName}</span>
      <div className={cn(styles.description)}>{desc || t('operation.description_undefined')}</div>
      <div className={cn(styles.editWrapper)}>
        <div className={cn(styles.edit)}>
          <Button className={cn(styles.editButton)} lable={t('OperationDetail.edit')} />
        </div>
      </div>
    </div>
  );
};

export default OperationDetail;
