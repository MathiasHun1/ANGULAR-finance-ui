import { computed, inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { PotModel } from "../models/models";
import { getCheckedThemeOptions } from "../shared/utils/utils";
import { v4 as uuidv4 } from "uuid";
import { BalanceService } from "./balance-service";

@Injectable({
  providedIn: "root",
})
export class PotsService {
  private apiService = inject(ApiService);
  private balanceService = inject(BalanceService);

  dataLoaded = signal(false);
  pots = signal<PotModel[] | null>(null);

  totalSavedPots = computed(() => {
    const pots = this.pots();
    if (!pots) {
      return 0;
    }

    return pots.reduce((tot, p) => {
      return tot + p.total;
    }, 0);
  });

  themeOptions = computed(() => {
    const pots = this.pots();
    if (!pots) {
      return [];
    }
    return getCheckedThemeOptions(pots);
  });

  activePot = signal<PotModel>({
    name: "",
    target: 0,
    total: 0,
    theme: "",
    id: "",
  });

  getPots() {
    this.apiService.getPots().subscribe({
      next: (pots) => {
        this.pots.set(pots);
        this.dataLoaded.set(true);
      },

      error: (err) => console.error("Error fetching pots", err),
    });
  }

  addPot(newPot: Omit<PotModel, "id">) {
    const id = uuidv4();
    const newPotWithId = { ...newPot, id };
    this.apiService.addPot(newPotWithId).subscribe({
      next: (pot) => {
        this.pots.update((prev) => {
          if (!prev) {
            return [pot];
          }

          return prev.concat(pot);
        });
      },
    });
  }

  deletePot(id: string) {
    this.apiService.deletePot(id).subscribe({
      next: () => {
        this.pots.update((prev) => {
          if (!prev) {
            return null;
          }

          this.balanceService.getBalance();
          return prev.filter((pot) => pot.id !== id);
        });
      },
      error: (err) => console.error("Error deleting budget object", err),
    });
  }

  updatePot(pot: PotModel) {
    this.apiService.updatePot(pot).subscribe({
      next: (updatedPot) => {
        console.log(updatedPot);

        this.pots.update((prev) => {
          if (!prev) {
            return null;
          }

          this.balanceService.getBalance();
          return prev.map((originalPot) =>
            originalPot.id === updatedPot.id ? updatedPot : originalPot
          );
        });
      },
      error: (err) => console.error("Error updating budget object", err),
    });
  }

  setActivePot(id: string) {
    const pot = this.pots()?.find((p) => p.id === id);
    if (!pot) {
      console.error("Pot with id not found:", id);
      this.clearActivePot();
      return;
    }

    this.activePot.set(pot);
  }

  clearActivePot() {
    this.activePot.set({
      name: "",
      target: 0,
      total: 0,
      theme: "",
      id: "",
    });
  }

  loadData() {
    this.getPots();
  }
}
