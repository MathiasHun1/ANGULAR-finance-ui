import {
  BudgetModel,
  ExtendedBudget,
  ThemeOption,
  TransactionModel,
} from "../../models/models";
import { themeOptions } from "../constants";

//returns the transactions of the actual month
export const getActualMonthTransactions = (
  transactions: TransactionModel[]
) => {
  const currentMonth = 7; //temporaroly harcoded value for august
  return transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonth
  );
};

export const getCheckedThemeOptions = (
  themedObjects: Array<{ theme: string; [key: string]: any }>
): Array<ThemeOption> => {
  const themesInUse = themedObjects.map((obj) => obj.theme.toLowerCase());
  const checkedThemes = themeOptions.map((t) => {
    return {
      ...t,
      inUse: themesInUse.includes(t.color.toLowerCase()),
    };
  });

  return checkedThemes;
};

export const getTransactionsByCategory = (
  transactions: TransactionModel[],
  category: string
): TransactionModel[] => {
  return transactions.filter(
    (trans) => trans.category.toLowerCase() === category.toLowerCase()
  );
};

export const getActualMonthSpendings = (
  transactions: TransactionModel[]
): number => {
  const acutalTransactions = transactions.filter((tr) => {
    const actualMonth = 7; // Temporary hardcoded August
    const transactionDate = new Date(tr.date).getMonth();
    return actualMonth === transactionDate;
  });

  return acutalTransactions.reduce((total, tr) => {
    return total + tr.amount;
  }, 0);
};

export const joinBudgetsAndTransactions = (
  budgets: BudgetModel[],
  transactions: TransactionModel[]
): ExtendedBudget[] => {
  const BudgetsWithTransactions = budgets.map((budget) => {
    const ownTransactions = getTransactionsByCategory(
      transactions,
      budget.category
    );

    return {
      ...budget,
      transactions: ownTransactions,
      spentThisMonth: getActualMonthSpendings(ownTransactions),
    };
  });

  return BudgetsWithTransactions;
};
