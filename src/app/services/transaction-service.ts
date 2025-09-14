import { inject, Injectable, computed, effect, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { TransactionModel } from "../models/models";
import { SortOptions } from "../models/models";
import { AuthService } from "./auth-service";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedin()) {
        this.clearData();
      }
    });
  }

  private searchValue = signal("");
  private sortValue = signal<SortOptions>("date");
  private categoryValue = signal("");

  // private methods for filtering and sorting
  private formatData(
    searchValue: string,
    categoryValue: string,
    sortValue: SortOptions,
    transactions: TransactionModel[]
  ) {
    const filteredData = this.filterByCategory(
      categoryValue,
      this.filterBySearchValue(searchValue, transactions)
    );
    const sortedFilteredData = this.sort(sortValue, filteredData);

    return sortedFilteredData;
  }

  private filterBySearchValue(value: string, transactions: TransactionModel[]) {
    if (!value) {
      return transactions;
    }
    return transactions.filter((t) =>
      t.name.toLocaleLowerCase().includes(value.trim().toLowerCase())
    );
  }

  private filterByCategory(value: string, transactions: TransactionModel[]) {
    if (!value) {
      return transactions;
    }

    return transactions.filter((t) => t.category === value);
  }

  private sort(
    value: SortOptions,
    transactions: TransactionModel[]
  ): TransactionModel[] {
    if (!value) {
      return transactions;
    }

    const transactionsCopy = [...transactions];

    switch (value) {
      case "date":
        return transactionsCopy.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

      case "dateReverse":
        return transactionsCopy.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

      case "name":
        return transactionsCopy.sort((a, b) => a.name.localeCompare(b.name));

      case "nameReverse":
        return transactionsCopy.sort((a, b) => b.name.localeCompare(a.name));

      case "amount":
        return transactionsCopy.sort((a, b) => b.amount - a.amount);

      case "amountReverse":
        return transactionsCopy.sort((a, b) => a.amount - b.amount);

      default:
        const _exhaustive: never = value;
        return transactionsCopy;
    }
  }

  /************
   * Public API
   ************/

  dataLoaded = signal(false);
  allTransactions = signal<TransactionModel[] | null>(null);

  computedTransactions = computed(() => {
    const transactions = this.allTransactions();
    if (!transactions) {
      return null;
    }
    return this.formatData(
      this.searchValue(),
      this.categoryValue(),
      this.sortValue(),
      transactions
    );
  });

  categories = computed(() => {
    const transactions = this.allTransactions();
    if (!transactions) {
      return null;
    }
    let categoryList: string[] = [];
    transactions.map((t) => {
      if (!categoryList.includes(t.category)) {
        categoryList.push(t.category);
      }
    });
    return categoryList;
  });

  income = computed(() => {
    const transactions = this.allTransactions();
    if (!transactions) {
      return 0;
    }

    const month = 6;
    const monthTransactions = transactions.filter((t) => {
      const trMonth = new Date(t.date).getMonth();
      return trMonth === month;
    });

    if (monthTransactions) {
      return monthTransactions.reduce((total: number, transaction) => {
        return total + transaction.amount;
      }, 0);
    }
    return 0;
  });

  getTransactions() {
    this.apiService.getTransactions().subscribe({
      next: (data) => {
        this.allTransactions.set(data);
        this.dataLoaded.set(true);
      },
      error: (err) => {
        console.error("Error fetching transactions:", err);
        this.allTransactions.set(null);
      },
    });
  }

  setSearchValue(value: string) {
    this.searchValue.set(value);
  }

  setSortValue(value: SortOptions) {
    this.sortValue.set(value);
  }

  setCategoryValue(value: string) {
    this.categoryValue.set(value);
  }

  getTransactionsByCategory(category: string | undefined) {
    if (!category) {
      return undefined;
    }

    const transactions = this.allTransactions();
    return transactions
      ? transactions.filter(
          (t) => t.category.toLowerCase() === category.toLowerCase()
        )
      : undefined;
  }

  loadData() {
    this.getTransactions();
    this.dataLoaded.set(true);
  }

  clearData() {
    this.searchValue.set("");
    this.sortValue.set("date");
    this.categoryValue.set("");
    this.allTransactions.set(null);
    this.dataLoaded.set(false);
  }
}
