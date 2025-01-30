import React, { FC } from 'react';
import CartButton from '../../../../features/Cart/ui/CartButton/CartButton';
import style from './ProductDetail.module.css';
import { useTranslation } from 'react-i18next';
import { Category, Product } from '../../../../shared/types/serverTypes';

type ProductDetailProps = Pick<Product, 'desc' | 'name' | 'price' | 'photo'> & {
  categoryName: Category['name'];
};

const ProductDetail: FC<ProductDetailProps> = ({ name, photo, desc, price, categoryName }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.imageWrapper}>
          {photo ? (
            <img className={style.image} src={photo} alt={t('product.photo_alt', { name })} />
          ) : (
            <img className={style.image} src="undefined.png" alt={t('product.photo_alt', { name })} />
          )}
        </div>
        <div className={style.infoWrapper}>
          <div className={style.title}>{name}</div>
          <div className={style.category}>{categoryName}</div>
          <div className={style.description}>{desc || t('product.description_undefined')}</div>
        </div>
        <div className={style.cartWrapper}>
          <div className={style.button}>
            <CartButton count={0} />
          </div>
          <div className={style.price}>{t('product.price', { price })}</div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
