import { Category } from '../../../../shared/types/serverTypes';

type BaseOperation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
};

type Cost = BaseOperation & {
  type: 'Cost';
};

type Profit = BaseOperation & {
  type: 'Profit';
};

export type Operation = Cost | Profit;
