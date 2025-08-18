import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, map, tap } from "rxjs";
import { BudgetModel, TransactionModel, PotModel } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://localhost:3000";
  private http = inject(HttpClient);
  private delay = 1000;

  getTransactions() {
    return this.http
      .get<TransactionModel[]>(`${this.baseUrl}/transactions`)
      .pipe(
        tap((result) => console.log("logged from API service: ", result)),
        map((result) =>
          result.map((transaction: TransactionModel) => ({
            ...transaction,
            avatar: transaction.avatar.replace("./assets", ""),
          }))
        ),
        delay(this.delay)
      );
  }

  getBudgets() {
    return this.http.get<BudgetModel[]>(`${this.baseUrl}/budgets`).pipe(
      tap((result) => console.log("Budgets from API: ", result)),
      delay(this.delay)
    );
  }

  getPots() {
    return this.http.get<PotModel[]>(`${this.baseUrl}/pots`).pipe(
      tap((result) => console.log("Pots from API: ", result)),
      delay(this.delay)
    );
  }
}
