import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private http = inject(HttpClient);

  getTransactions() {
    return this.http.get<any>("/data.json").pipe(
      map((result) =>
        result.transactions.map((transaction: any) => ({
          ...transaction,
          avatar: transaction.avatar.replace("./assets", ""),
        }))
      ),
      tap((result) => console.log("logged from service: ", result))
    );
  }
}
