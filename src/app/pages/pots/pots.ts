import { Component, inject, OnInit } from "@angular/core";
import { PotsService } from "../../services/pots-service";
import { ModalService } from "../../services/modal-service";
import { Dropdown } from "../../shared/components/dropdown/dropdown";
import { ModalFormType } from "../../models/models";

@Component({
  selector: "app-pots",
  imports: [Dropdown],
  templateUrl: "./pots.html",
  styleUrl: "./pots.scss",
})
export class Pots implements OnInit {
  private potsService = inject(PotsService);
  private modalService = inject(ModalService);

  ngOnInit(): void {
    this.potsService.getPots();
  }

  pots = this.potsService.pots;

  openModal(event: ModalFormType) {
    this.modalService.openModal(event);
  }

  onAddMoneyClick(id: string) {
    this.openModal("add-to-pot");
    this.potsService.setActivePot(id);
  }

  onWithdrawClick(id: string) {
    this.openModal("withdraw-from-pot");
    this.potsService.setActivePot(id);
  }
}
