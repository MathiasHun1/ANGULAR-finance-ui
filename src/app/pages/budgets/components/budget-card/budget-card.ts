import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BudgetModel, TransactionModel } from "../../../../models/models";

@Component({
  selector: "app-budget-card",
  imports: [CommonModule],
  templateUrl: "./budget-card.html",
  styleUrl: "./budget-card.scss",
})
export class BudgetCard {
  transaction = input<TransactionModel>();
}
