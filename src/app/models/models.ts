export interface RecurringBill {
  avatar: string;
  name: string;
  dueDate: number;
  amount: number;
}

export interface TransactionModel {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
  id: string;
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
  id: string;
}

export interface ExtendedBudget extends BudgetModel {
  transactions: TransactionModel[];
  spentThisMonth: number;
}

export interface PotModel {
  name: string;
  target: number;
  total: number;
  theme: string;
  id: string;
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

export interface ThemeOption {
  name: string;
  color: string;
  inUse: boolean;
}

export type ModalFormType =
  | "add-budget"
  | "add-pot"
  | "edit-budget"
  | "edit-pot"
  | "delete-budget"
  | "delete-pot"
  | "add-to-pot"
  | "withdraw-from-pot";
