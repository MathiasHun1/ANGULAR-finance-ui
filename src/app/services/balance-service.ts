import { inject, Injectable, signal } from "@angular/core";
import { BalanceModel } from "../models/models";
import { ApiService } from "./api-service";
import { switchMap, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BalanceService {
  apiService = inject(ApiService);

  constructor() {
    this.getBalance();
  } // Load the balance data on service initialization

  balanceLoaded = signal(false);
  balanceData = signal<BalanceModel | null>(null);

  getBalance() {
    this.apiService.getBalance().subscribe({
      next: (bal: BalanceModel) => {
        this.balanceLoaded.set(true);
        this.balanceData.set(bal);
      },
      error: (err) => {
        console.error("Error fetching balance", err),
          this.balanceData.set(null);
      },
    });
  }

  addToCurrent(amount: number) {
    const balance = this.balanceData();
    if (!balance) {
      return;
    }

    this.apiService
      .updateBalance({
        ...balance,
        current: balance.current + amount,
      })
      .pipe(tap((updatedBalance) => this.balanceData.set(updatedBalance)))
      .subscribe();
  }

  withdrawFromCurrent(amount: number) {
    const balance = this.balanceData();
    if (!balance) {
      return;
    }

    if (amount > balance.current) {
      return console.warn("Insufficient funds in current balance");
    }

    this.apiService
      .updateBalance({
        ...balance,
        current: balance.current - amount,
      })
      .pipe(tap((updatedBalance) => this.balanceData.set(updatedBalance)))
      .subscribe();
  }

  loadData() {
    this.getBalance();
  }
}
