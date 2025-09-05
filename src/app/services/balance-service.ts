import { inject, Injectable, signal } from "@angular/core";
import { BalanceModel } from "../models/models";
import { ApiService } from "./api-service";

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

  loadData() {
    this.getBalance();
  }
}
