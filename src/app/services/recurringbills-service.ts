import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, take, tap } from "rxjs";
import { TransactionModel } from "../models/models";
import { RecurringBill } from "../models/models";
import { Signal } from "@angular/core";
import { SortOptions } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class RecurringbillsService {
  private apiService = inject(ApiService);

  billTypes: Signal<RecurringBill[]> = toSignal(
    this.apiService.getRecurringTypeBills().pipe(
      tap((res) => console.log("LOG bills from service: ", res)),
      map((result) =>
        result.map((t) => {
          return { ...t, avatar: t.avatar.replace("./assets", "") };
        })
      )
    ),
    { initialValue: [] }
  );

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
}
