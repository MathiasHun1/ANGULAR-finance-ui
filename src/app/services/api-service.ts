import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  delay,
  distinct,
  filter,
  forkJoin,
  map,
  mergeAll,
  Observable,
  tap,
  toArray,
} from "rxjs";
import {
  BudgetModel,
  TransactionModel,
  PotModel,
  RecurringBill,
} from "../models/models";

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

  getRecurringTypeBills(): Observable<RecurringBill[]> {
    return this.http
      .get<TransactionModel[]>(`${this.baseUrl}/transactions`)
      .pipe(
        // 1. Filter out the recurring transactions.
        map((result) => result.filter((t) => t.recurring === true)),
        // 2.Flatten the array into a stream of individual transactions.
        mergeAll(),
        // 3.  Emit only transactions with a unique name.
        distinct((transaction) => transaction.name),
        // 4. Transform the stream of transactions back to an array
        toArray(),
        map((bills) =>
          bills.map((b) => {
            const duedate = new Date(b.date).getDate();
            return {
              avatar: b.avatar,
              name: b.name,
              dueDate: duedate,
              amount: b.amount,
            };
          })
        ),
        tap((res) => console.log("Log bills from API :", res)),
        delay(1000)
      );
  }
}
