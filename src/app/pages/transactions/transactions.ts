import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { tap } from "rxjs";

@Component({
  selector: "app-transactions",
  imports: [],
  templateUrl: "./transactions.html",
  styleUrl: "./transactions.scss",
})
export class Transactions {
  private apiService = inject(ApiService);

  transactions = toSignal(this.apiService.getTransactions());
}
