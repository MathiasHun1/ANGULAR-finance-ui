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

@Component({
  selector: "app-transactions",
  imports: [CommonModule],
  templateUrl: "./transactions.html",
  styleUrl: "./transactions.scss",
})
export class Transactions {
  private apiService = inject(ApiService);

  // All fetched data
  allTransactions: Signal<TransactionModel[]> = toSignal(
    this.apiService.getTransactions(),
    {
      initialValue: [] as TransactionModel[],
    }
  );

  /***  Pagination logic ***/
  paginatedData = signal<TransactionModel[]>([]);
  currentPage = signal(1);
  itemsPerPage = 10;
  pagesCount = computed<number | undefined>(() => {
    return this.allTransactions().length === 0
      ? undefined
      : Math.ceil(this.allTransactions().length / this.itemsPerPage);
  });
  pageNumbers = computed<number[]>(() => {
    const pagesCount = this.pagesCount();

    if (!pagesCount) {
      return [];
    } else {
    }
    return Array.from({ length: pagesCount }, (value, index) => index + 1);
  });

  constructor() {
    effect(() => {
      if (this.allTransactions().length > 0) {
        this.paginate();
      }
    });
  }

  paginate() {
    const firstIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const lastIndex = firstIndex + this.itemsPerPage;

    const slicedData = this.allTransactions().slice(firstIndex, lastIndex);
    this.paginatedData.set(slicedData);
  }

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
}
