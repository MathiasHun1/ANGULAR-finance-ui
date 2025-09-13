import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  delay,
  distinct,
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
  BalanceModel,
} from "../models/models";
import { joinBudgetsAndTransactions } from "../shared/utils/utils";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = `${environment.apiUrl}`;
  private http = inject(HttpClient);
  private delay = 0;

  getTransactions() {
    return this.http
      .get<TransactionModel[]>(`${this.baseUrl}/transactions`)
      .pipe(
        map((result) =>
          result.map((transaction: TransactionModel) => ({
            ...transaction,
            avatar: transaction.avatar.replace("./assets", ""),
          }))
        ),
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
        delay(1000)
      );
  }

  getBalance() {
    return this.http
      .get<BalanceModel>(`${this.baseUrl}/balance`)
      .pipe(delay(1000));
  }

  updateBalance(newBalance: BalanceModel) {
    return this.http
      .put<BalanceModel>(`${this.baseUrl}/balance`, newBalance)
      .pipe(delay(1000));
  }

  /**
   * Budget related API calls
   */
  getBudgets() {
    return this.http
      .get<BudgetModel[]>(`${this.baseUrl}/budgets`)
      .pipe(delay(this.delay));
  }

  addBudget(budget: BudgetModel) {
    return this.http.post<BudgetModel>(`${this.baseUrl}/budgets`, budget);
  }

  deleteBudget(id: string) {
    return this.http.delete(`${this.baseUrl}/budgets/${id}`);
  }

  updateBudget(budget: BudgetModel) {
    return this.http.put<BudgetModel>(
      `${this.baseUrl}/budgets/${budget.id}`,
      budget
    );
  }

  // join budgets objects with the corrsponding transactions, and the actual month spending sum
  getExtendedBudgets() {
    return forkJoin({
      budgets: this.getBudgets(),
      transactions: this.getTransactions(),
    }).pipe(
      map(({ budgets, transactions }) => {
        return joinBudgetsAndTransactions(budgets, transactions);
      })
    );
  }

  /**
   * Pots related API calls
   */
  getPots() {
    return this.http.get<PotModel[]>(`${this.baseUrl}/pots`);
  }

  addPot(pot: PotModel) {
    return this.http.post<PotModel>(`${this.baseUrl}/pots`, pot);
  }

  deletePot(id: string) {
    return this.http.delete(`${this.baseUrl}/pots/${id}`);
  }

  updatePot(pot: PotModel) {
    return this.http.put<PotModel>(`${this.baseUrl}/pots/${pot.id}`, pot);
  }

  /**
   * Login
   */
  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
