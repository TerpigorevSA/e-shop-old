import * as yup from 'yup';
import { CategoriesFilters, CommonFilters } from '../../../shared/types/serverTypes';

export const categoryFilterSchema: yup.ObjectSchema<Omit<CategoriesFilters, keyof CommonFilters>> = yup.object({
  name: yup.string().optional(),
  ids: yup.array().optional(),
});
