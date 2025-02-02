import * as yup from 'yup';
import { OrdersFilters, CommonFilters, OrderStatus } from '../../../shared/types/serverTypes';

export const orderFilterSchema: yup.ObjectSchema<Omit<OrdersFilters, keyof CommonFilters>> = yup.object({
  name: yup.string().optional(),
  ids: yup.array().optional(),
  productIds: yup.array().optional(),
  userId: yup.string().optional(),
  status: yup
    .mixed<OrderStatus>()
    .oneOf([
      OrderStatus.Delivered,
      OrderStatus.InTransit,
      OrderStatus.OrderCancelled,
      OrderStatus.PendingConfirmation,
      OrderStatus.Processing,
      OrderStatus.ReturnRequested,
      OrderStatus.WaitingForDelivery,
    ])
    .optional(),
});
