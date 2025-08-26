import { Component, inject, input } from "@angular/core";
import { ModalService } from "../../../services/modal-service";
import { BudgetService } from "../../../services/budget-service";

@Component({
  selector: "app-dropdown",
  imports: [],
  templateUrl: "./dropdown.html",
  styleUrl: "./dropdown.scss",
})
export class Dropdown {
  modalService = inject(ModalService);
  budgetService = inject(BudgetService);

  type = input.required<"budget" | "pot">();
  entityName = input.required<string>();
  id = input.required<string>();

  onDeleteClick() {
    if (this.type() === "budget") {
      this.modalService.openModal("delete-budget");
      this.budgetService.activeBudget.set({
        name: this.entityName(),
        id: this.id(),
      });
    }
  }

  onEditClick() {
    if (this.type() === "budget") {
      console.log("Edit budget");
    }
  }
}
