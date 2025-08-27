import { inject, Injectable, computed, Signal, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { TransactionModel } from "../models/models";
import { SortOptions } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private apiService = inject(ApiService);

  // Private signals for state management
  allTransactions: Signal<TransactionModel[] | undefined> = toSignal(
    this.apiService.getTransactions()
  );

  private serarchValue = signal("");
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

  categories = computed(() => {
    const transactions = this.allTransactions();
    if (!transactions) {
      return undefined;
    }
    let categoryList: string[] = [];
    transactions.map((t) => {
      if (!categoryList.includes(t.category)) {
        categoryList.push(t.category);
      }
    });
    return categoryList;
  });

  computedTransactions = computed(() => {
    const transactions = this.allTransactions();
    if (!transactions) {
      return undefined;
    }
    return this.formatData(
      this.serarchValue(),
      this.categoryValue(),
      this.sortValue(),
      transactions
    );
  });

  setSearchValue(value: string) {
    this.serarchValue.set(value);
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
}
