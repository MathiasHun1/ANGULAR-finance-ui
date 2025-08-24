import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { BudgetCard } from "./components/budget-card/budget-card";
import { Chart } from "../../shared/components/chart/chart";
import { BudgetService } from "../../services/budget-service";
import { Modal } from "../../shared/components/modal/modal";
import { budgetOptions, themeOptions } from "../../shared/constants";
import { FormsModule } from "@angular/forms";
import { CustomSelectInput } from "../../shared/components/custom-select-input/custom-select-input";

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
export class Budgets {
  private budegetService = inject(BudgetService);

  extendedBudgets = this.budegetService.extendedBudgets;
  modalOpened = signal(false);
  openModal() {
    this.modalOpened.set(true);
  }
  budgetOptions = budgetOptions;
  themeOptions = this.budegetService.themeOptions;
  themeOptionsStrings = computed(() =>
    this.themeOptions().map((option) => option.name)
  );

  onCloseModal(event: string) {
    console.log(event);

    this.modalOpened.set(false);
  }

  submitForm(formValue: any) {
    console.log({ ...formValue, theme: formValue.theme.name });
  }
}
