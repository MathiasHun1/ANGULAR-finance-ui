import { computed, inject, Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { TransactionService } from "./transaction-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { BudgetModel, ExtendedBudget } from "../models/models";
import { getActualMonthTransactions } from "../shared/utils/utils";

@Injectable({
  providedIn: "root",
})
export class BudgetService {
  apiService = inject(ApiService);
  transactionService = inject(TransactionService);

  //all budget element related transactions
  budgetTransactions = computed(() => {
    const budgetCategories = this.budgets()?.map((b) => b.category);
    return this.transactionService
      .allTransactions()
      ?.filter((t) => budgetCategories?.includes(t.category));
  });

  budgets = toSignal<BudgetModel[]>(this.apiService.getBudgets());
  budgetsLimit = computed<number>(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return 0;
    }

    return budgets.reduce((total: number, b: BudgetModel) => {
      return total + b.maximum;
    }, 0);
  });

  // connect budgets with transactions
  extendedBudgets = computed<ExtendedBudget[] | undefined>(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return undefined;
    }

    const extended = budgets.map((b) => {
      const ownTransactions =
        this.transactionService.getTransactionsByCategory(b.category) || [];

      const spentThisMonth = getActualMonthTransactions(ownTransactions).reduce(
        (total, t) => {
          return total + t.amount;
        },
        0
      );
      return {
        ...b,
        transactions: ownTransactions,
        spentThisMonth: Number(spentThisMonth.toFixed(0)),
      };
    });

    return extended;
  });
}
