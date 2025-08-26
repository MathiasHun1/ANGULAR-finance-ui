import { Component, inject, input, signal, viewChild } from "@angular/core";
import { BudgetService } from "../../../../services/budget-service";
import { ModalService } from "../../../../services/modal-service";
import { BudgetModel, ThemeOption } from "../../../../models/models";
import { FormsModule, NgForm } from "@angular/forms";
import { CustomSelectInput } from "../../custom-select-input/custom-select-input";

@Component({
  selector: "app-edit-budget-form",
  imports: [FormsModule, CustomSelectInput],
  templateUrl: "./edit-budget-form.html",
  styleUrl: "./edit-budget-form.scss",
})
export class EditBudgetForm {
  budgetService = inject(BudgetService);
  modalService = inject(ModalService);

  budgetForm = viewChild<NgForm>("budgetForm");

  themeOptions = this.budgetService.themeOptions;
  selectedTheme = signal<ThemeOption | undefined>(undefined);
  maximumSpent = signal<string>("");

  submitForm() {
    if (!this.maximumSpent() || !this.selectedTheme()?.name) {
      return;
    }

    const updatedBudget: BudgetModel = {
      ...this.budgetService.activeBudget(),
      maximum: Number(this.maximumSpent()),
      theme: this.selectedTheme()!.color,
    };
    this.budgetService.updateBudget(updatedBudget);
    this.clearForm();
    this.modalService.closeModal();
  }

  clearForm() {
    this.budgetForm()?.resetForm();
  }
}
