import React, { FC } from 'react';
import cn from 'clsx';
import style from './Button.module.css';

type ButtonProps = {
  lable: string;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
};

const Button: FC<ButtonProps> = ({
  lable,
  className,
  disabled = true,
  onClick = () => {
    /* do nothing */
  },
  type = 'button',
}) => {
  return (
    <div className={style.wrapper}>
      <button
        className={cn({
          [style.button_disable]: disabled,
          [style.button_enable]: !disabled,
          [className]: !disabled,
          [style.button]: true,
        })}
        disabled={disabled}
        type={type}
        onClick={type === 'button' ? onClick : undefined}
      >
        {lable}
      </button>
    </div>
  );
};

export default Button;
