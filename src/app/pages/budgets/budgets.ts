import { CommonModule } from "@angular/common";
import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  viewChild,
} from "@angular/core";
import { BudgetCard } from "./components/budget-card/budget-card";
import { Chart } from "../../shared/components/chart/chart";
import { BudgetService } from "../../services/budget-service";
import { FormsModule, NgForm } from "@angular/forms";
import { BudgetModel, ExtendedBudget, ThemeOption } from "../../models/models";
import { ModalService } from "../../services/modal-service";
import { TransactionService } from "../../services/transaction-service";
import { getActualMonthTransactions } from "../../shared/utils/utils";

@Component({
  selector: "app-budgets",
  imports: [CommonModule, FormsModule, BudgetCard, Chart],
  templateUrl: "./budgets.html",
  styleUrl: "./budgets.scss",
})
export class Budgets implements OnInit {
  private budgetService = inject(BudgetService);
  private modalService = inject(ModalService);
  private transactionService = inject(TransactionService);

  // Load data on init
  ngOnInit(): void {
    if (!this.budgetService.dataLoaded()) {
      this.budgetService.loadData();
    }

    if (!this.transactionService.dataLoaded()) {
      this.transactionService.getTransactions();
    }
  }

  modalOpened = signal(false);
  dataLoaded = computed(
    () =>
      this.transactionService.dataLoaded() && this.budgetService.dataLoaded()
  );
  extendedBudgets = this.budgetService.extendedBudgets;

  openModal() {
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
