import { CommonFiltersForm } from 'src/features/forms/CommonFiltersForm/CommonFiltersForm';
import { CategoriesFilters } from 'src/shared/types/serverTypes';
import React from 'react';
import { categoryFilterSchema } from 'src/entities/Category/model/CategoryFilterSchema';
// import { createCategoryFiltersSchema } from 'src/entities/Category/model/CategoryFilterSchema';
import { useTranslation } from 'react-i18next';

type CategoriesFiltersFormProps = {
  initialFilters: CategoriesFilters;
  onChange: (filters: CategoriesFilters) => void;
};
const CategoriesFiltersForm = ({ initialFilters, onChange }: CategoriesFiltersFormProps) => {
  const { t } = useTranslation();

  //  const [CategoryFilterSchema] = useState(createCategoryFiltersSchema(categories.map((category) => category.id)));

  return (
    <CommonFiltersForm initialFilters={initialFilters} childrenSchema={categoryFilterSchema} onChange={onChange}>
      {(
        errors: Record<string, string>,
        filters: CategoriesFilters,
        handleChange: <K extends keyof CategoriesFilters>(key: K, value: CategoriesFilters[K]) => void
      ) => (
        <>
          {/* <div>
         <label className={cn(styles.label)}>{t('CategoriesFiltersForm.category.label')}</label>
         <select
           className={cn(styles.select)}
           value={!!filters?.categoryIds && filters?.categoryIds.length > 0 ? getFirst(filters.categoryIds) : ''}
           onChange={(e) => handleChange('categoryIds', e.target.value ? [e.target.value] : undefined)}
         >
           <option value="">{t('CategoriesFiltersForm.category.noCategory')}</option>
           {categories.map((category) => (
                 <option key={category.id} value={category.id}>
                   {category.name}
                 </option>
               ))}
             </select>
             {errors['categoryId'] && <p className={cn(styles.error)}>{t(errors['categoryId'])}</p>}
        </div> */}
        </>
      )}
    </CommonFiltersForm>
  );
};

export default CategoriesFiltersForm;
