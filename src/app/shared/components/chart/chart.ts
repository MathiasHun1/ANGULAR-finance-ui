import { Component, computed, inject, signal } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { BudgetService } from "../../../services/budget-service";
import { TransactionService } from "../../../services/transaction-service";
import { ExtendedBudget } from "../../../models/models";
import { getActualMonthTransactions } from "../../utils/utils";

@Component({
  selector: "app-chart",
  imports: [BaseChartDirective],
  templateUrl: "./chart.html",
  styleUrl: "./chart.scss",
})
export class Chart {
  budgetService = inject(BudgetService);
  transactionsService = inject(TransactionService);
  budgets = this.budgetService.budgets;

  // Connect budget objects with corresponding transactions
  budgetsWithOwnTransactions = computed<ExtendedBudget[] | undefined>(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return undefined;
    }

    const extendedBudgets = budgets.map((b) => {
      const transactions = this.transactionsService.getTransactionsByCategory(
        b.category
      );

      return { ...b, transactions: transactions };
    });

    return extendedBudgets;
  });

  limit = this.budgetService.budgetsLimit;
  spendingsList = computed<number[]>(() => {
    const budgets = this.budgetsWithOwnTransactions();
    if (!budgets) {
      return [];
    }

    return budgets.map((b) => {
      if (!b.transactions) {
        return 0;
      }
      // get the corresponding transactions, and sum the last month spendings
      const actualTransactions = getActualMonthTransactions(b.transactions);

      return actualTransactions.reduce((total: number, t) => {
        return total + t.amount;
      }, 0);
    });
  });

  chartData = computed<ChartConfiguration<"doughnut">["data"]["datasets"]>(
    () => {
      const budgets = this.budgetService.budgets();
      const transactionColors = budgets ? budgets.map((b) => b.theme) : [];
      return [
        { data: this.spendingsList(), backgroundColor: transactionColors },
      ];
    }
  );
}
