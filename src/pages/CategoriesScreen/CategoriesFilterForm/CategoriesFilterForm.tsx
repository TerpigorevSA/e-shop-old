import { CommonFiltersForm } from 'src/features/forms/CommonFiltersForm/CommonFiltersForm';
import { CategoriesFilters } from 'src/shared/types/serverTypes';
import React from 'react';
import { categoryFilterSchema } from 'src/entities/Category/model/CategoryFilterSchema';
import { useTranslation } from 'react-i18next';

type CategoriesFiltersFormProps = {
  initialFilters: CategoriesFilters;
  onChange: (filters: CategoriesFilters) => void;
};
const CategoriesFiltersForm = ({ initialFilters, onChange }: CategoriesFiltersFormProps) => {
  const { t } = useTranslation();

  return (
    <CommonFiltersForm
      initialFilters={initialFilters}
      childrenSchema={categoryFilterSchema}
      onChange={onChange}
    ></CommonFiltersForm>
  );
};

export default CategoriesFiltersForm;
