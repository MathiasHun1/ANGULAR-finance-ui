import { Component, inject } from "@angular/core";
import { PotsService } from "../../services/pots-service";

@Component({
  selector: "app-pots",
  imports: [],
  templateUrl: "./pots.html",
  styleUrl: "./pots.scss",
})
export class Pots {
  private potsService = inject(PotsService);

  pots = this.potsService.pots;
}
