import { Component, inject, input } from "@angular/core";
import { ModalService } from "../../../services/modal-service";
import { BudgetService } from "../../../services/budget-service";
import { PotsService } from "../../../services/pots-service";

@Component({
  selector: "app-dropdown",
  imports: [],
  templateUrl: "./dropdown.html",
  styleUrl: "./dropdown.scss",
})
export class Dropdown {
  modalService = inject(ModalService);
  budgetService = inject(BudgetService);
  potsService = inject(PotsService);

  type = input.required<"budget" | "pot">();
  entityName = input.required<string>();
  id = input.required<string>();

  onDeleteClick() {
    if (this.type() === "budget") {
      this.modalService.openModal("delete-budget");
      this.budgetService.setActiveBudget(this.id());
    }

    if (this.type() === "pot") {
      this.modalService.openModal("delete-pot");
      this.potsService.setActivePot(this.id());
    }
  }

  onEditClick() {
    if (this.type() === "budget") {
      this.modalService.openModal("edit-budget");
      this.budgetService.setActiveBudget(this.id());
    }

    if (this.type() === "pot") {
      this.modalService.openModal("edit-pot");
      this.potsService.setActivePot(this.id());
    }
  }
}
