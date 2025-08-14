import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { BudgetCard } from "./components/budget-card/budget-card";

@Component({
  selector: "app-budgets",
  imports: [CommonModule, BudgetCard],
  templateUrl: "./budgets.html",
  styleUrl: "./budgets.scss",
})
export class Budgets {
  private apiService = inject(ApiService);

  budgets = toSignal(this.apiService.getBudgets());
}
