import React, { FC } from 'react';
import style from './CartItem.module.css';
import Counter from '../../../../shared/ui/Counter/Counter';
import Button from '../../../../shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { Product } from '../../../../shared/types/serverTypes';

type CartItemProps = Pick<Product, 'price' | 'name' | 'photo'> & {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onInputChange: (value: number) => void;
};

const CartItem: FC<CartItemProps> = ({ name, count, photo, price, onIncrement, onDecrement, onInputChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.imageWrapper}>
          <img className={style.image} src={photo} alt={t('product.photo', { name })} />
        </div>
        <div className={style.infoWrapper}>
          <div className={style.title}>{name}</div>
        </div>
        <div className={style.cartWrapper}>
          <div className={style.counter}>
            <Counter
              count={count}
              min={1}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onInputChange={onInputChange}
            />
          </div>
          <div className={style.price}>{t('product.price', { price: count * price })}</div>
          {/* <div className={style.price}>{(count * price).toFixed(2)}&nbsp;руб.</div> */}
          <div className={style.removeWrapper}>
            <Button
              className={style.remove}
              lable={t('CartItem.button')}
              onClick={() => {
                onInputChange(0);
              }}
              disabled={count === 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
