import React from 'react';
import style from './CartIndicator.module.css';
import cartEmptyIco from '../../../../shared/assets/shopping_cart_off_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import cartFilledIco from '../../../../shared/assets/shopping_cart_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store/store';

const CartIndicator: React.FC = () => {
  const productsInCart = useSelector((state: RootState) => state.cart.currentCartEntries?.length ?? 0);

  return (
    <div className={style.wrapper}>
      <img src={productsInCart > 0 ? cartFilledIco : cartEmptyIco} alt="cart" className={style.image} />
      {productsInCart > 0 && <span className={style.badge}>{productsInCart}</span>}
    </div>
  );
};

export default CartIndicator;
