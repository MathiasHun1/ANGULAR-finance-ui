import { inject, Injectable, signal, effect } from "@angular/core";
import { BalanceModel } from "../models/models";
import { ApiService } from "./api-service";
import { AuthService } from "./auth-service";

@Injectable({
  providedIn: "root",
})
export class BalanceService {
  apiService = inject(ApiService);
  authService = inject(AuthService);

  constructor() {
    effect(() => {
      if (this.authService.isLoggedin()) {
        this.clearData();
      }
    });
  }

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

  clearData() {
    this.balanceLoaded.set(false);
    this.balanceData.set(null);
  }
}
