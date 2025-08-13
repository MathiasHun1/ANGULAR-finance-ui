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
  private allTransactions: Signal<TransactionModel[]> = toSignal(
    this.apiService.getTransactions(),
    {
      initialValue: [],
    }
  );

  private serarchValue = signal("");
  private sortValue = signal<SortOptions>("date");

  // private methods for filtering and sorting
  private formatData(
    searchValue: string,
    sortValue: SortOptions,
    transactions: TransactionModel[]
  ) {
    const filteredData = this.filterBySearchValue(searchValue, transactions);
    const sortedData = this.sort(sortValue, filteredData);

    return sortedData;
  }

  private filterBySearchValue(value: string, transactions: TransactionModel[]) {
    if (!value) {
      return transactions;
    }
    return transactions.filter((t) =>
      t.name.toLocaleLowerCase().includes(value.trim().toLowerCase())
    );
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

  computedTransactions = computed(() =>
    this.formatData(
      this.serarchValue(),
      this.sortValue(),
      this.allTransactions()
    )
  );

  setSearchValue(value: string) {
    this.serarchValue.set(value);
  }

  setSortValue(value: SortOptions) {
    this.sortValue.set(value);
  }
}
