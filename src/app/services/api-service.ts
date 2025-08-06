import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";
import { DataModel, TransactionModel } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private http = inject(HttpClient);

  getTransactions() {
    return this.http.get<DataModel>("/data.json").pipe(
      map((result) =>
        result.transactions.map((transaction: TransactionModel) => ({
          ...transaction,
          avatar: transaction.avatar.replace("./assets", ""),
        }))
      ),
      tap((result) => console.log("logged from service: ", result))
    );
  }
}
