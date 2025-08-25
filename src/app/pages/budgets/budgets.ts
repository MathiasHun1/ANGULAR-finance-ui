import { CommonModule } from "@angular/common";
import { Component, effect, inject, OnInit, signal } from "@angular/core";
import { BudgetCard } from "./components/budget-card/budget-card";
import { Chart } from "../../shared/components/chart/chart";
import { BudgetService } from "../../services/budget-service";
import { Modal } from "../../shared/components/modal/modal";
import { budgetOptions } from "../../shared/constants";
import { FormsModule } from "@angular/forms";
import { CustomSelectInput } from "../../shared/components/custom-select-input/custom-select-input";
import { BudgetModel, ThemeOption } from "../../models/models";

@Component({
  selector: "app-budgets",
  imports: [
    CommonModule,
    FormsModule,
    BudgetCard,
    Chart,
    Modal,
    CustomSelectInput,
  ],
  templateUrl: "./budgets.html",
  styleUrl: "./budgets.scss",
})
export class Budgets implements OnInit {
  private budgetService = inject(BudgetService);

  ngOnInit(): void {
    this.budgetService.getBudgets();
  }

  extendedBudgets = this.budgetService.extendedBudgets;
  modalOpened = signal(false);
  openModal() {
    this.modalOpened.set(true);
  }
  budgetOptions = this.budgetService.availableCategories;
  themeOptions = this.budgetService.themeOptions;

  selectedTheme = signal<ThemeOption | undefined>(undefined);
  maximumSpent = signal<string>("");
  selectedCategory = signal<string>("");

  onCloseModal(event: string) {
    this.modalOpened.set(false);
  }

  clearForm() {
    this.selectedCategory.set("");
    this.maximumSpent.set("");
    this.selectedTheme.set(undefined);
  }

  submitForm() {
    if (
      !this.selectedCategory() ||
      !this.maximumSpent() ||
      !this.selectedTheme()?.name
    ) {
      return;
    }

    const newBudget: BudgetModel = {
      category: this.selectedCategory(),
      maximum: Number(this.maximumSpent()),
      theme: this.selectedTheme()!.color,
    };

    this.budgetService.addBudget(newBudget);
    this.clearForm();
  }
}
