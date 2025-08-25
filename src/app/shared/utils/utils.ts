import { ThemeOption, TransactionModel } from "../../models/models";
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
  console.log(themesInUse);

  const checkedThemes = themeOptions.map((t) => {
    return {
      ...t,
      inUse: themesInUse.includes(t.color.toLowerCase()),
    };
  });

  return checkedThemes;
};
