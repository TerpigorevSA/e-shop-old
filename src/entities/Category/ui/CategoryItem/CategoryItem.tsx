import React, { FC, memo } from 'react';
import cn from 'clsx';
import style from './CategoryItem.module.css';
import { useTranslation } from 'react-i18next';
import { Category } from '../../../../shared/types/serverTypes';

type CategoryItemProps = Pick<Category, 'name' | 'photo'>;

const CategoryItem: FC<CategoryItemProps> = ({ photo, name }) => {
  const { t } = useTranslation();
  return (
    <div className={cn(style.wrapper)}>
      <div>
        <img className={cn(style.image)} src={photo} alt={t('category.photo_alt', { name })} />
      </div>
      <div className={cn(style.title)}>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default memo(CategoryItem) as typeof CategoryItem;
