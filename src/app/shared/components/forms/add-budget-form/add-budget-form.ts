import { Component, signal, inject, viewChild } from "@angular/core";
import { CustomSelectInput } from "../../custom-select-input/custom-select-input";
import { FormsModule, NgForm } from "@angular/forms";
import { BudgetService } from "../../../../services/budget-service";
import { ThemeOption, BudgetModel } from "../../../../models/models";
import { ModalService } from "../../../../services/modal-service";

@Component({
  selector: "app-add-budget-form",
  imports: [CustomSelectInput, FormsModule],
  templateUrl: "./add-budget-form.html",
  styleUrl: "./add-budget-form.scss",
})
export class AddBudgetForm {
  budgetService = inject(BudgetService);
  modalService = inject(ModalService);

  budgetForm = viewChild<NgForm>("budgetForm");

  selectedCategory = signal<string>("");
  budgetOptions = this.budgetService.availableCategories;
  themeOptions = this.budgetService.themeOptions;
  selectedTheme = signal<ThemeOption | undefined>(undefined);
  maximumSpent = signal<string>("");

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
    this.modalService.closeModal();
  }

  clearForm() {
    this.budgetForm()?.resetForm();
  }
}
