import { computed, inject, Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class PotsService {
  private apiService = inject(ApiService);
  pots = toSignal(this.apiService.getPots());

  totalSavedPots = computed(() => {
    const pots = this.pots();
    if (!pots) {
      return 0;
    }

    return pots.reduce((tot, p) => {
      return tot + p.total;
    }, 0);
  });
}
