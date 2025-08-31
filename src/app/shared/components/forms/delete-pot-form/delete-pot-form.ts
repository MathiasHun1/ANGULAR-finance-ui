import { Component, inject } from "@angular/core";
import { PotsService } from "../../../../services/pots-service";
import { ModalService } from "../../../../services/modal-service";
import { BalanceService } from "../../../../services/balance-service";

@Component({
  selector: "app-delete-pot-form",
  imports: [],
  templateUrl: "./delete-pot-form.html",
  styleUrl: "./delete-pot-form.scss",
})
export class DeletePotForm {
  potService = inject(PotsService);
  modalService = inject(ModalService);
  balanceService = inject(BalanceService);

  id = this.potService.activePot().id;

  deletePot() {
    this.potService.deletePot(this.id);
    this.balanceService.addToCurrent(this.potService.activePot().total);
    this.potService.clearActivePot();
    this.modalService.closeModal();
  }

  cancelDelete() {
    this.potService.clearActivePot();
    this.modalService.closeModal();
  }
}
