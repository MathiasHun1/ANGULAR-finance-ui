import { Component, inject } from "@angular/core";
import { BudgetService } from "../../../../services/budget-service";
import { ModalService } from "../../../../services/modal-service";

@Component({
  selector: "app-delete-budget-form",
  imports: [],
  templateUrl: "./delete-budget-form.html",
  styleUrl: "./delete-budget-form.scss",
})
export class DeleteBudgetForm {
  budgetService = inject(BudgetService);
  modalService = inject(ModalService);
  id = this.budgetService.activeBudget().id;

  deleteBudget() {
    this.budgetService.deleteBudget(this.id);
    this.budgetService.clearActiveBudget();
    this.modalService.closeModal();
  }

  cancelDelete() {
    this.budgetService.clearActiveBudget();
    this.modalService.closeModal();
  }
}
