import { TransactionModel } from "../../models/models";

export const getActualMonthTransactions = (
  transactions: TransactionModel[]
) => {
  const currentMonth = 7; //temporaroly harcoded value for august
  return transactions.filter(
    (t) => new Date(t.date).getMonth() === currentMonth
  );
};
