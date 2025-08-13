import { Component, computed, effect, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TransactionService } from "../../services/transaction-service";
import { SortOptions } from "../../models/models";

@Component({
  selector: "app-transactions",
  imports: [CommonModule, FormsModule],
  templateUrl: "./transactions.html",
  styleUrl: "./transactions.scss",
})
export class Transactions {
  // Services
  private transactionsService = inject(TransactionService);

  // Private state variables
  private transactions = this.transactionsService.computedTransactions;
  private itemsPerPage = 10;

  private pagesCount = computed<number | undefined>(() => {
    return this.transactions().length === 0
      ? undefined
      : Math.ceil(this.transactions().length / this.itemsPerPage);
  });

  // Trigger changes in service-state when input values change
  constructor() {
    effect(() => {
      this.transactionsService.setSearchValue(this.searchFieldValue());
    });

    effect(() => {
      this.transactionsService.setSortValue(this.sortValue());
    });

    effect(() => {
      this.transactionsService.setCategoryValue(this.categoryValue());
    });
  }

  // Signals used in the template
  searchFieldValue = signal("");
  categoryValue = signal("");
  sortValue = signal<SortOptions>("date");
  currentPage = signal(1);
  paginatedData = computed(() => {
    const itemsPerPage = this.itemsPerPage;
    const firstIndex = (this.currentPage() - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;

    return this.transactions().slice(firstIndex, lastIndex);
  });
  pageNumbers = computed<number[]>(() => {
    const pagesCount = this.pagesCount();

    if (!pagesCount) {
      return [];
    } else {
    }
    return Array.from({ length: pagesCount }, (value, index) => index + 1);
  });
  categories = this.transactionsService.categories;

  // Event Handdlers
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
