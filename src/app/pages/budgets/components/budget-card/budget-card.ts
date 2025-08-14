import { Component, computed, signal, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetModel, TransactionModel } from "../../../../models/models";
import { TransactionService } from "../../../../services/transaction-service";

@Component({
  selector: "app-budget-card",
  imports: [CommonModule],
  templateUrl: "./budget-card.html",
  styleUrl: "./budget-card.scss",
})
export class BudgetCard {
  transactionService = inject(TransactionService);

  budget = input<BudgetModel | undefined>(undefined);
  transactions = computed(() =>
    this.transactionService.getTransactionsByCategory(this.budget()?.category)
  );

  moneySpent = computed<number | undefined>(() => {
    const allTransactions = this.transactions();
    if (!allTransactions) {
      return undefined;
    }

    const monthTransactions = allTransactions.filter((t) => {
      const transactionMonth = new Date(t.date).getMonth();

      return transactionMonth === 7; //hardcoded "august" for now
    });

    const result: number = monthTransactions.reduce((total, t) => {
      return total + Number(t.amount);
    }, 0);

    return result * -1;
  });

  usedUpBudget = computed<number>(() => {
    const budgetMax = this.budget()?.maximum;
    const moneySpent = this.moneySpent();
    if (!budgetMax || typeof moneySpent !== "number") {
      return 0;
    }
    return (moneySpent / budgetMax) * 100;
  });
}
