import React, { FC } from 'react';
import cn from 'clsx';
import buttonStyle from '../../../../shared/ui/Button/Button.module.css';
import style from './CartButton.module.css';
import Counter from '../../../../shared/ui/Counter/Counter';
import { useTranslation } from 'react-i18next';

export type CartButtonProps = {
  count: number;
  max?: number;
  disabled?: boolean;
  onCountChange?: (value: number) => void;
};

const CartButton: FC<CartButtonProps> = ({
  count,
  max,
  disabled,
  onCountChange = (value: number) => {
    /* do nothing */
  },
}) => {
  const { t } = useTranslation();

  return (
    <div className={cn(style.wrapper)}>
      {count === 0 ? (
        <button
          className={cn({
            [buttonStyle.button_disable]: disabled,
            [buttonStyle.button_enable]: !disabled,
            [style.button]: !disabled,
            [buttonStyle.button]: true,
          })}
          disabled={disabled}
          onClick={() => onCountChange(1)}
        >
          {t('CartButton.button')}
        </button>
      ) : (
        <Counter
          count={count}
          min={0}
          max={max}
          disabled={disabled}
          onDecrement={() => onCountChange(count - 1)}
          onIncrement={() => onCountChange(count + 1)}
          onInputChange={(value) => onCountChange(value)}
        />
      )}
    </div>
  );
};

export default CartButton;
