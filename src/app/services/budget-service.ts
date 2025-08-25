import { computed, inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { TransactionService } from "./transaction-service";
import { BudgetModel, ExtendedBudget } from "../models/models";
import { getActualMonthTransactions } from "../shared/utils/utils";
import { checkThemeOptions } from "../shared/utils/utils";
import { budgetOptions } from "../shared/constants";

@Injectable({
  providedIn: "root",
})
export class BudgetService {
  private apiService = inject(ApiService);
  private transactionService = inject(TransactionService);

  // budgets = toSignal<BudgetModel[]>(this.apiService.getBudgets());
  budgets = signal<BudgetModel[] | null>(null);

  //all budget-element related transactions
  budgetTransactions = computed(() => {
    const budgetCategories = this.budgets()?.map((b) => b.category);
    return this.transactionService
      .allTransactions()
      ?.filter((t) => budgetCategories?.includes(t.category));
  });

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

  availableCategories = computed(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return [];
    }

    return budgetOptions.filter((option) => {
      return !budgets.some(
        (budget) => budget.category.toLowerCase() === option.toLowerCase()
      );
    });
  });

  themeOptions = computed(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return [];
    }

    return checkThemeOptions(budgets);
  });

  getBudgets() {
    this.apiService.getBudgets().subscribe({
      next: (response) => this.budgets.set(response),
      error: (err) => console.error("Error fetching budgets", err),
    });
  }

  addBudget(budget: BudgetModel) {
    this.apiService.addBudget(budget).subscribe({
      next: (response) =>
        this.budgets.update((prev) => {
          if (!prev) {
            return null;
          }
          return [...prev, response];
        }),
      error: (err) => console.error("Error adding budget object", err),
    });
  }
}
