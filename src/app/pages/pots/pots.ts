import { Component, inject } from "@angular/core";
import { PotsService } from "../../services/pots-service";
import { Modal } from "../../shared/components/modal/modal";

@Component({
  selector: "app-pots",
  imports: [Modal],
  templateUrl: "./pots.html",
  styleUrl: "./pots.scss",
})
export class Pots {
  private potsService = inject(PotsService);

  pots = this.potsService.pots;
}
