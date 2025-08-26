import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal, viewChild } from "@angular/core";
import { BudgetCard } from "./components/budget-card/budget-card";
import { Chart } from "../../shared/components/chart/chart";
import { BudgetService } from "../../services/budget-service";
import { FormsModule, NgForm } from "@angular/forms";
import { BudgetModel, ThemeOption } from "../../models/models";
import { ModalService } from "../../services/modal-service";

@Component({
  selector: "app-budgets",
  imports: [CommonModule, FormsModule, BudgetCard, Chart],
  templateUrl: "./budgets.html",
  styleUrl: "./budgets.scss",
})
export class Budgets implements OnInit {
  private budgetService = inject(BudgetService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.budgetService.getBudgets();
  }

  extendedBudgets = this.budgetService.extendedBudgets;
  modalOpened = signal(false);
  openModal() {
    // this.modalOpened.set(true);
    this.modalService.openModal("add-budget");
  }
  budgetOptions = this.budgetService.availableCategories;
  themeOptions = this.budgetService.themeOptions;

  selectedTheme = signal<ThemeOption | undefined>(undefined);
  maximumSpent = signal<string>("");
  selectedCategory = signal<string>("");

  budgetForm = viewChild<NgForm>("budgetForm");

  onCloseModal(event: string) {
    this.modalOpened.set(false);
    this.clearForm();
  }

  clearForm() {
    this.budgetForm()?.resetForm();
  }

  submitForm() {
    if (
      !this.selectedCategory() ||
      !this.maximumSpent() ||
      !this.selectedTheme()?.name
    ) {
      return;
    }

    const newBudget: Omit<BudgetModel, "id"> = {
      category: this.selectedCategory(),
      maximum: Number(this.maximumSpent()),
      theme: this.selectedTheme()!.color,
    };

    this.budgetService.addBudget(newBudget);
    this.clearForm();
  }
}
