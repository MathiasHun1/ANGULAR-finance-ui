import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
} from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { TransactionModel } from "../../models/models";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

type SortOptions =
  | "date"
  | "dateReverse"
  | "amount"
  | "amountReverse"
  | "name"
  | "nameReverse";

@Component({
  selector: "app-transactions",
  imports: [CommonModule, FormsModule],
  templateUrl: "./transactions.html",
  styleUrl: "./transactions.scss",
})
export class Transactions {
  private apiService = inject(ApiService);

  // Fetched data
  private _allTransactions: Signal<TransactionModel[]> = toSignal(
    this.apiService.getTransactions(),
    {
      initialValue: [] as TransactionModel[],
    }
  );

  // Computed data used for pagination
  private _computedTransactions = computed(() =>
    this.formatData(
      this.searchField(),
      this.sortInput(),
      this._allTransactions()
    )
  );

  //paginated data used in the template
  paginatedData = computed(() => {
    const itemsPerPage = this.itemsPerPage;
    const firstIndex = (this.currentPage() - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;

    return this._computedTransactions().slice(firstIndex, lastIndex);
  });

  itemsPerPage = 10;

  // Signals used in the pagination html
  currentPage = signal(1);
  pagesCount = computed<number | undefined>(() => {
    return this._computedTransactions().length === 0
      ? undefined
      : Math.ceil(this._computedTransactions().length / this.itemsPerPage);
  });
  pageNumbers = computed<number[]>(() => {
    const pagesCount = this.pagesCount();

    if (!pagesCount) {
      return [];
    } else {
    }
    return Array.from({ length: pagesCount }, (value, index) => index + 1);
  });

  // pagination methods
  stepToPage(page: number) {
    this.currentPage.set(page);
  }

  stepNextPage() {
    if (this.currentPage() === this.pagesCount()) {
      return;
    }
    this.currentPage.update((prev) => prev + 1);
  }

  stepPrevPage() {
    if (this.currentPage() === 1) {
      return;
    }
    this.currentPage.update((prev) => prev - 1);
  }

  // Input fields
  searchField = signal("");
  sortInput = signal<SortOptions>("date");

  // Data forming functions
  formatData(
    searchValue: string,
    sortValue: SortOptions,
    transactions: TransactionModel[]
  ) {
    const filteredData = this.filterBySearchValue(searchValue, transactions);
    const sortedData = this.sort(sortValue, filteredData);

    return sortedData;
  }

  filterBySearchValue(value: string, transactions: TransactionModel[]) {
    if (!value) {
      return transactions;
    }
    return transactions.filter((t) =>
      t.name.toLocaleLowerCase().includes(value.trim().toLowerCase())
    );
  }

  sort(
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
}
