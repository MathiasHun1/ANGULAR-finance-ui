import { Component, computed, signal, inject, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetModel } from "../../../../models/models";
import { TransactionService } from "../../../../services/transaction-service";
import { Dropdown } from "../../../../shared/components/dropdown/dropdown";
@Component({
  selector: "app-budget-card",
  imports: [CommonModule, Dropdown],
  templateUrl: "./budget-card.html",
  styleUrl: "./budget-card.scss",
})
export class BudgetCard {
  transactionService = inject(TransactionService);

  budget = input<BudgetModel | undefined>(undefined);
  transactions = computed(() => {
    const transactions = this.transactionService.getTransactionsByCategory(
      this.budget()?.category
    );

    const sortedTransByDate = transactions?.sort((tr1, tr2) => {
      const date1 = new Date(tr1.date);
      const date2 = new Date(tr2.date);

      return date2.getTime() - date1.getTime();
    });
    return sortedTransByDate;
  });

  openedState = signal(false);
  moneySpent = computed<number | undefined>(() => {
    const allTransactions = this.transactions();
    if (!allTransactions) {
      return undefined;
    }

    const monthTransactions = allTransactions.filter((t) => {
      const transactionMonth = new Date(t.date).getMonth();

      return transactionMonth === new Date().getMonth();
    });

    const result: number =
      -1 *
      monthTransactions.reduce((total, t) => {
        return total + Number(t.amount);
      }, 0);

    return result >= 0 ? result : 0;
  });

  usedUpBudget = computed<number>(() => {
    const budgetMax = this.budget()?.maximum;
    const moneySpent = this.moneySpent();
    if (!budgetMax || typeof moneySpent !== "number") {
      return 0;
    }
    return (moneySpent / budgetMax) * 100;
  });

  toggleOpoenedstate() {
    this.openedState.update((prev) => !prev);
  }
}
