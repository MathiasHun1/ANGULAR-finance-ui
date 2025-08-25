import { Component, computed, inject, signal } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import { BudgetService } from "../../../services/budget-service";
import { ExtendedBudget } from "../../../models/models";
import { getActualMonthTransactions } from "../../utils/utils";

@Component({
  selector: "app-chart",
  imports: [BaseChartDirective],
  templateUrl: "./chart.html",
  styleUrl: "./chart.scss",
})
export class Chart {
  private budgetService = inject(BudgetService);

  private budgetsWithOwnTransactions = this.budgetService.extendedBudgets;

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

      const result =
        -1 *
        actualTransactions.reduce((total: number, t) => {
          return total + t.amount;
        }, 0);

      return result >= 0 ? result : 0;
    });
  });

  moneySpent = computed(() => {
    const spendingsList = this.spendingsList();
    if (!spendingsList) {
      return 0;
    }

    return spendingsList.reduce((total, value) => {
      return total + value;
    }, 0);
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

  chartOptions: ChartConfiguration<"doughnut">["options"] = {
    cutout: "60%",
  };
}
