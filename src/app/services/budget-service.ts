import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { BudgetModel, ExtendedBudget } from "../models/models";
import { getCheckedThemeOptions } from "../shared/utils/utils";
import { budgetOptions } from "../shared/constants";
import { v4 as uuidv4 } from "uuid";
import { AuthService } from "./auth-service";

@Injectable({
  providedIn: "root",
})
export class BudgetService {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedin()) {
        this.clearData();
      }
    });
  }

  dataLoaded = signal(false);
  budgets = signal<BudgetModel[] | null>(null);
  extendedBudgets = signal<ExtendedBudget[] | null>(null);

  budgetsLimit = computed<number>(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return 0;
    }

    return budgets.reduce((total: number, b: BudgetModel) => {
      return total + b.maximum;
    }, 0);
  });

  availableCategories = computed(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return [];
    }

    return budgetOptions.filter((option) => {
      return !budgets.some(
        (budget) => budget.category.toLowerCase() === option.toLowerCase()
      );
    });
  });

  themeOptions = computed(() => {
    const budgets = this.budgets();
    if (!budgets) {
      return [];
    }

    return getCheckedThemeOptions(budgets);
  });

  activeBudget = signal<BudgetModel>({
    category: "",
    id: "",
    maximum: 0,
    theme: "",
  });

  setActiveBudget(id: string) {
    const budget = this.budgets()?.find((b) => b.id === id);
    if (budget) {
      return this.activeBudget.set(budget);
    }

    console.error("Budget with id not found:", id);
    this.clearActiveBudget();
  }

  clearActiveBudget() {
    this.activeBudget.set({
      category: "",
      id: "",
      maximum: 0,
      theme: "",
    });
  }

  getBudgets() {
    this.apiService.getBudgets().subscribe({
      next: (response) => {
        this.budgets.set(response);
      },
      error: (err) => console.error("Error fetching budgets", err),
    });
  }

  addBudget(budget: Omit<BudgetModel, "id">) {
    const id = uuidv4();
    const budgetWithId = { ...budget, id };
    this.apiService.addBudget(budgetWithId).subscribe({
      next: (budget) => this.loadData(),
      error: (err) => console.error("Error adding budget object", err),
    });
  }

  deleteBudget(id: string) {
    this.apiService.deleteBudget(id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error("Error deleting budget object", err),
    });
  }

  updateBudget(budget: BudgetModel) {
    this.apiService.updateBudget(budget).subscribe({
      next: (response) => this.loadData(),
      error: (err) => console.error("Error updating budget object", err),
    });
  }

  getExtendedBudgets() {
    this.apiService.getExtendedBudgets().subscribe({
      next: (result) => this.extendedBudgets.set(result),
      error: (err) =>
        console.log("Couldn't join budgets with transactions", err),
    });
  }

  loadData() {
    this.getBudgets();
    this.getExtendedBudgets();
    this.dataLoaded.set(true);
  }

  clearData() {
    this.budgets.set(null);
    this.dataLoaded.set(false);
    this.extendedBudgets.set(null);
    this.activeBudget.set({
      category: "",
      id: "",
      maximum: 0,
      theme: "",
    });
  }
}
