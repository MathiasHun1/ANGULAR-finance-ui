import { inject, Injectable, computed, signal, effect } from "@angular/core";
import { ApiService } from "./api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { RecurringBill } from "../models/models";
import { Signal } from "@angular/core";
import { SortOptions } from "../models/models";
import { AuthService } from "./auth-service";

@Injectable({
  providedIn: "root",
})
export class RecurringbillsService {
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
  billTypes = signal<RecurringBill[] | null>(null);
  sortValue = signal<SortOptions>("date");
  searchFieldValue = signal("");

  sortedBills = computed(() => {
    if (!this.billTypes()) {
      return null;
    }
    return this.sort(this.sortValue(), this.billTypes()!);
  });

  paidBills = computed(() => {
    if (!this.billTypes()) {
      return null;
    }

    return {
      bills: this.billTypes()!.filter((b) => b.dueDate < new Date().getDate()),
      theme: "#277C78",
    };
  });

  dueSoonBills = computed(() => {
    if (!this.billTypes()) {
      return null;
    }

    return {
      bills: this.billTypes()!.filter((b) => {
        const today = new Date().getDate();
        return today <= b.dueDate && today >= b.dueDate - 3;
      }),
      theme: "#82C9D7",
    };
  });
  upcomingBills = computed(() => {
    if (!this.billTypes()) {
      return null;
    }

    return {
      bills: this.billTypes()!.filter((b) => new Date().getDate() <= b.dueDate),
      theme: "#F2CDAC",
    };
  });

  getRecurringBills() {
    this.apiService
      .getRecurringTypeBills()
      .pipe(
        map((result) =>
          result.map((t) => {
            return { ...t, avatar: t.avatar.replace("./assets", "") };
          })
        )
      )
      .subscribe({
        next: (bills) => {
          this.billTypes.set(bills);
          this.dataLoaded.set(true);
        },
        error: (err) => console.error("Error fetching recurring bills", err),
      });
  }

  sort(value: SortOptions, transactions: RecurringBill[]): RecurringBill[] {
    if (!value) {
      return transactions;
    }

    const transactionsCopy = [...transactions];

    switch (value) {
      case "date":
        return transactionsCopy.sort((a, b) => {
          return a.dueDate - b.dueDate;
        });

      case "dateReverse":
        return transactionsCopy.sort((a, b) => {
          return b.dueDate - a.dueDate;
        });

      case "name":
        return transactionsCopy.sort((a, b) => a.name.localeCompare(b.name));

      case "nameReverse":
        return transactionsCopy.sort((a, b) => b.name.localeCompare(a.name));

      case "amountReverse":
        return transactionsCopy.sort((a, b) => b.amount - a.amount);

      case "amount":
        return transactionsCopy.sort((a, b) => a.amount - b.amount);

      default:
        const _exhaustive: never = value;
        return transactionsCopy;
    }
  }

  getTotalAmount(bills: RecurringBill[] | null) {
    if (!bills) {
      return 0;
    }

    return Number(
      bills
        .reduce((total, bill) => {
          return total + bill.amount;
        }, 0)
        .toFixed(2)
    );
  }

  loadData() {
    this.getRecurringBills();
  }

  clearData() {
    this.billTypes.set(null);
    this.dataLoaded.set(false);
    this.sortValue.set("date");
    this.searchFieldValue.set("");
  }
}
