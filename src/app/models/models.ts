export interface TransactionModel {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface BalanceModel {
  current: number;
  income: number;
  expenses: number;
}

export interface BudgetModel {
  category: string;
  maximum: number;
  theme: string;
}

export interface PotModel {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export interface DataModel {
  balance: BalanceModel;
  transactions: TransactionModel[];
  budgets: BudgetModel[];
  pots: PotModel[];
}

export type SortOptions =
  | "date"
  | "dateReverse"
  | "amount"
  | "amountReverse"
  | "name"
  | "nameReverse";
