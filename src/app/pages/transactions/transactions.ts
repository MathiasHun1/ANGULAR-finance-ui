import {
  Component,
  computed,
  effect,
  inject,
  Signal,
  WritableSignal,
  signal,
} from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { TransactionModel } from "../../models/models";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

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
    this.formatData(this.searchField(), this._allTransactions())
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

  // Data forming functions
  formatData(searchValue: string, transactions: TransactionModel[]) {
    let data: TransactionModel[];
    data = this.filterBySearchValue(searchValue, transactions);

    return data;
  }

  filterBySearchValue(value: string, transactions: TransactionModel[]) {
    if (!value) {
      return transactions;
    }
    return transactions.filter((t) =>
      t.name.toLocaleLowerCase().includes(value.trim().toLowerCase())
    );
  }
}
