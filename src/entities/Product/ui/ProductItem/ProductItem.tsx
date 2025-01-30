import React, { FC, memo } from 'react';
import cn from 'clsx';
import style from './ProductItem.module.css';
import CartButton from '../../../../features/Cart/ui/CartButton/CartButton';
import cutStringHelper from '../../../../shared/lib/cutStringHelper';
import { useTranslation } from 'react-i18next';
import { Product } from '../../../../shared/types/serverTypes';

type ProductItemProps = Pick<Product, 'price' | 'name' | 'desc' | 'photo'> & {
  onCountChange?: (value: number) => void;
  count?: number;
  withButton?: boolean;
};

const ProductItem: FC<ProductItemProps> = ({ price, photo, name, desc, count, withButton = true, onCountChange }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(style.wrapper)}>
      <div>
        <img className={cn(style.image)} src={photo} alt={t('product.photo_alt', { name })} />
      </div>
      <div className={cn(style.title)}>
        <h3>{name}</h3>
      </div>
      <div className={cn(style.price)}>
        <span>{t('product.price', { price })}</span>
      </div>
      <div className={cn(style.description)}>
        <p>{cutStringHelper(desc, 100) || t('product.description_undefined')}</p>
      </div>
      <div className={cn(style.button)} style={withButton ? { visibility: 'visible' } : { visibility: 'hidden' }}>
        <CartButton count={count} onCountChange={onCountChange} />
      </div>
    </div>
  );
};

export default memo(ProductItem) as typeof ProductItem;
