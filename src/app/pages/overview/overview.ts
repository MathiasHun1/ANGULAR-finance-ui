import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { BalanceModel } from "../../models/models";
import { CommonModule } from "@angular/common";
import { PotsService } from "../../services/pots-service";
import { Router, RouterLink } from "@angular/router";
import { ListItem } from "../../shared/components/list-item/list-item";

@Component({
  selector: "app-overview",
  imports: [CommonModule, RouterLink, ListItem],
  templateUrl: "./overview.html",
  styleUrl: "./overview.scss",
})
export class Overview {
  apiService = inject(ApiService);
  potsService = inject(PotsService);

  balance = toSignal<BalanceModel>(this.apiService.getBalance());
  totalSavedPots = this.potsService.totalSavedPots;
  potsData = this.potsService.pots;
}
