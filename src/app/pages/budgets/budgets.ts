import { CommonModule } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { TransactionModel } from "../../models/models";

@Component({
  selector: "app-budgets",
  imports: [CommonModule],
  templateUrl: "./budgets.html",
  styleUrl: "./budgets.scss",
})
export class Budgets {
  apiService = inject(ApiService);

  transactions = toSignal<TransactionModel[]>(
    this.apiService.getTransactions()
  );
  budgets = toSignal(this.apiService.getBudgets());

  filterTransactions(value: string) {
    const transactions = this.transactions();
    if (!transactions) {
      return;
    }
    return transactions.filter((t) => t.category === value);
  }
}
