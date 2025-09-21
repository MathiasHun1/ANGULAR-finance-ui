import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  viewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TransactionService } from "../../services/transaction-service";
import { SortOptions } from "../../models/models";
import { ModalService } from "../../services/modal-service";

@Component({
  selector: "app-transactions",
  imports: [CommonModule, FormsModule],
  templateUrl: "./transactions.html",
  styleUrl: "./transactions.scss",
})
export class Transactions implements OnInit {
  /**
   * Services
   */
  private transactionsService = inject(TransactionService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    if (!this.transactions()) {
      this.transactionsService.getTransactions();
    }
  }

  /**
   * Private state variables
   */
  private transactions = this.transactionsService.computedTransactions;
  private itemsPerPage = 10;

  private pagesCount = computed<number | undefined>(() => {
    const transactions = this.transactions();
    if (!transactions) {
      return undefined;
    }
    return Math.ceil(transactions.length / this.itemsPerPage);
  });

  //Trigger changes in service-state when input values change
  constructor() {
    effect(() => {
      this.transactionsService.setSearchValue(this.searchFieldValue());
      this.searchFieldValue() && this.stepToPage(1);
    });

    effect(() => {
      this.transactionsService.setSortValue(this.sortValue());
      this.sortValue() && this.stepToPage(1);
    });

    effect(() => {
      this.transactionsService.setCategoryValue(this.categoryValue());
      this.categoryValue() && this.stepToPage(1);
    });
  }

  /**
   * Signals used in the template
   */
  searchFieldValue = signal("");
  categoryValue = signal("");
  sortValue = signal<SortOptions>("date");
  currentPage = signal(1);
  paginatedData = computed(() => {
    const itemsPerPage = this.itemsPerPage;
    const firstIndex = (this.currentPage() - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;

    const transactions = this.transactions();
    return transactions ? transactions.slice(firstIndex, lastIndex) : undefined;
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

  mobileSortOpen = signal(false);
  mobileCategorySelectOpen = signal(false);
  /**
   * Event Handdlers
   */

  openModal() {
    this.modalService.openModal("add-transaction");
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

  openMobileSortInput() {
    alert("Sort options will be available soon!");
  }

  openMobileCategorySelect() {
    alert("Category filter will be available soon!");
  }

  clickOnSortOption(option: SortOptions) {
    this.sortValue.set(option);
  }

  clickOnCategoryOption(option: string) {
    this.categoryValue.set(option);
  }

  toggleMobileSortOpen() {
    this.mobileSortOpen.update((prev) => !prev);
  }

  toggleMobileCategorySelectOpen() {
    this.mobileCategorySelectOpen.update((prev) => !prev);
  }

  mobileSortMenu = viewChild<ElementRef<HTMLUListElement>>("mobileSortMenu");
  categorySelectMenu =
    viewChild<ElementRef<HTMLUListElement>>("categorySelectMenu");

  // Close mobile sort menu when clicking outside of it
  @HostListener("click", ["$event"])
  onClickOutsideSortoptions(event: MouseEvent) {
    if (
      this.mobileSortOpen() &&
      this.mobileSortMenu() &&
      event.target instanceof Node &&
      !this.mobileSortMenu()!.nativeElement.contains(event.target)
    ) {
      this.mobileSortOpen.set(false);
    }
    if (
      this.mobileCategorySelectOpen() &&
      this.categorySelectMenu() &&
      event.target instanceof Node &&
      !this.categorySelectMenu()!.nativeElement.contains(event.target)
    ) {
      this.mobileCategorySelectOpen.set(false);
    }
  }
}
