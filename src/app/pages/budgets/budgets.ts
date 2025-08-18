import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { BudgetCard } from "./components/budget-card/budget-card";
import { Chart } from "../../shared/components/chart/chart";
import { BudgetService } from "../../services/budget-service";

@Component({
  selector: "app-budgets",
  imports: [CommonModule, BudgetCard, Chart],
  templateUrl: "./budgets.html",
  styleUrl: "./budgets.scss",
})
export class Budgets {
  private budegetService = inject(BudgetService);

  extendedBudgets = this.budegetService.extendedBudgets;
}
