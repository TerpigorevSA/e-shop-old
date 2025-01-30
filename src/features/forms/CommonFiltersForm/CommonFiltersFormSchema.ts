import * as yup from 'yup';
import { CommonFilters, DateInterval, Sorting } from '../../../shared/types/serverTypes';

// const dateIntervalSchema = yup.object().shape({
//   gte: yup.string().optional(),
//   lte: yup.string().optional(),
// }).test('date-range-check', 'Начальная дата должна быть меньше конечной', function (value) {
//   if (value?.gte && value?.lte) {
//     return new Date(value.gte) < new Date(value.lte);
//   }
//   return true; // Если одно из значений отсутствует, не проверяем
// });

// const dateIntervalSchema = yup.object().shape({
//     gte: yup.string().optional(),
//     lte: yup
//         .string()
//         .optional()
//         .when('gte', ([gte], schema) =>
//             gte
//                 ? schema.test(
//                     'date-order',
//                     'CommonFiltersForm.errors.LteLessGte',
//                     (lte: string | undefined) => !lte || new Date(gte) <= new Date(lte)
//                 )
//                 : schema
//         ),
// });
const dateIntervalSchema: yup.ObjectSchema<DateInterval> = yup.object({
  gte: yup.string().optional(),
  lte: yup
    .string()
    .optional()
    .when('gte', ([gte], schema) =>
      gte
        ? schema.test(
            'date-order',
            'CommonFiltersFormSchema.dateIntervalSchema.LteLessGte',
            (lte) => !lte || new Date(gte) < new Date(lte)
          )
        : schema
    ),
});

// export const commonFiltersFormSchema = yup.object().shape({
//   createdAt: dateIntervalSchema,
//   updatedAt: dateIntervalSchema,
//   // sorting: yup.object().shape({
//   //   type: yup.mixed<'ASC' | 'DESC'>().oneOf(['ASC', 'DESC']).required(),
//   //   field: yup.mixed<'id' | 'createdAt' | 'updatedAt' | 'name'>().oneOf(['id', 'createdAt', 'updatedAt', 'name']).required(),
//   // }),
// });
export const commonFiltersSchema: yup.ObjectSchema<CommonFilters> = yup.object({
  pagination: yup
    .object({
      pageSize: yup.number().integer().min(1).optional(),
      pageNumber: yup.number().integer().min(1).optional(),
    })
    .optional(),
  createdAt: dateIntervalSchema.optional(),
  updatedAt: dateIntervalSchema.optional(),
  sorting: yup
    .object({
      type: yup.mixed<Sorting['type']>().oneOf(['ASC', 'DESC']), //.required(),
      field: yup.mixed<Sorting['field']>().oneOf(['id', 'createdAt', 'updatedAt', 'name']), //.required(),
    })
    .noUnknown()
    .optional() as yup.Schema<Sorting | undefined>,
  // .nullable()
  // .default(undefined),
});

// export const getSchema = (schemas: yup.ObjectSchema<any>[] | undefined): yup.ObjectSchema<any> => {
//   return schemas
//     ? schemas.reduce((accSchema, currentSchema) => accSchema.concat(currentSchema), commonFiltersSchema)
//     : commonFiltersSchema;
// };
