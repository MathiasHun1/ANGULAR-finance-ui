import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, take, tap } from "rxjs";
import { TransactionModel } from "../models/models";
import { RecurringBill } from "../models/models";
import { Signal } from "@angular/core";

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
}
