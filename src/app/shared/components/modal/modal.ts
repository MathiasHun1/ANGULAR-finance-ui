import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from "@angular/core";
import { viewChild } from "@angular/core";
import {} from "@angular/core";
import { BudgetService } from "../../../services/budget-service";
import { ModalService } from "../../../services/modal-service";
import { AddBudgetForm } from "../forms/add-budget-form/add-budget-form";
import { DeleteBudgetForm } from "../forms/delete-budget-form/delete-budget-form";
import { EditBudgetForm } from "../forms/edit-budget-form/edit-budget-form";
import { AddPotForm } from "../forms/add-pot-form/add-pot-form";
import { PotsService } from "../../../services/pots-service";
import { DeletePotForm } from "../forms/delete-pot-form/delete-pot-form";
import { EditPotForm } from "../forms/edit-pot-form/edit-pot-form";
import { AddToPotForm } from "../forms/add-to-pot-form/add-to-pot-form";
import { WithdrawFromPotForm } from "../forms/withdraw-from-pot-form/withdraw-from-pot-form";
import { AddTransactionForm } from "../forms/add-transaction-form/add-transaction-form";

@Component({
  selector: "app-modal",
  imports: [
    AddBudgetForm,
    DeleteBudgetForm,
    EditBudgetForm,
    AddPotForm,
    DeletePotForm,
    EditPotForm,
    AddToPotForm,
    WithdrawFromPotForm,
    AddTransactionForm,
  ],
  templateUrl: "./modal.html",
  styleUrl: "./modal.scss",
})
export class Modal {
  modalService = inject(ModalService);
  budgetService = inject(BudgetService);
  potService = inject(PotsService);

  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  currentFormType = this.modalService.currentFormType;
  title = input<string>();
  subTitle = input<string>();
  entityName = input<string>("");
  id = input<string>("");

  modalOpened = this.modalService.opened;
  modalClosed = output<string>();

  constructor() {
    // manage the modal opened state based on the input signal
    effect(() => {
      if (!this.modalOpened()) {
        this.modal()!.nativeElement.style.display = "none";
        this.modal()!.nativeElement.classList.remove("visible");
      } else {
        this.modal()!.nativeElement.style.display = "block";
        // add some style asynchronously, to make animations work
        setTimeout(() => {
          this.modal()!.nativeElement.classList.add("visible");
        }, 0);
      }
    });
  }

  onBackdropClick(event: MouseEvent) {
    const modal = this.modal();

    // check if click happens on the backdrop element
    if (event.target === modal!.nativeElement) {
      this.modalService.closeModal();
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
