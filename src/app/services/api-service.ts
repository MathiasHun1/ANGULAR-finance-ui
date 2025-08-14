import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";
import { BudgetModel, TransactionModel } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "http://localhost:3000";
  private http = inject(HttpClient);

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
        )
      );
  }

  getBudgets() {
    return this.http
      .get<BudgetModel[]>(`${this.baseUrl}/budgets`)
      .pipe(tap((result) => console.log("Budgets from API: ", result)));
  }
}
