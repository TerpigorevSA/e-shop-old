import { CommonFiltersForm } from 'src/features/forms/CommonFiltersForm/CommonFiltersForm';
import { Category, ProductsFilters } from 'src/shared/types/serverTypes';
import React from 'react';
import cn from 'clsx';
import styles from './CatalogFiltersForm.module.css';
// import { productFilterSchema } from 'src/entities/Product/model/ProductFilterSchema';
import { createProductFiltersSchema } from 'src/entities/Product/model/ProductFilterSchema';
import { useTranslation } from 'react-i18next';

type CatalogFiltersFormProps = {
  initialFilters: ProductsFilters;
  categories: Category[];
  onChange: (filters: ProductsFilters) => void;
};
const CatalogFiltersForm = ({ initialFilters, onChange, categories }: CatalogFiltersFormProps) => {
  const getFirst = (array: string[]) => {
    const [categoryId] = array;
    return categoryId;
  };
  const { t } = useTranslation();

  // const [productFilterSchema] = useState(createProductFiltersSchema(categories.map((category) => category.id)));
  const productFilterSchema = createProductFiltersSchema(categories?.map((category) => category.id));

  return (
    <CommonFiltersForm initialFilters={initialFilters} childrenSchema={productFilterSchema} onChange={onChange}>
      {(
        errors: Record<string, string>,
        filters: ProductsFilters,
        handleChange: <K extends keyof ProductsFilters>(key: K, value: ProductsFilters[K]) => void
      ) => (
        <div>
          <label className={cn(styles.label)}>{t('CatalogFiltersForm.category.label')}</label>
          <select
            className={cn(styles.select)}
            value={!!filters?.categoryIds && filters?.categoryIds.length > 0 ? getFirst(filters.categoryIds) : ''}
            onChange={(e) => handleChange('categoryIds', e.target.value ? [e.target.value] : undefined)}
          >
            <option value="">{t('CatalogFiltersForm.category.noCategory')}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors['categoryId'] && <p className={cn(styles.error)}>{t(errors['categoryId'])}</p>}
        </div>
      )}
    </CommonFiltersForm>
  );
};

export default CatalogFiltersForm;
