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
import { ModalService } from "../../../services/modal-service";
import { AddBudgetForm } from "../forms/add-budget-form/add-budget-form";
import { DeleteBudgetForm } from "../forms/delete-budget-form/delete-budget-form";
import { BudgetService } from "../../../services/budget-service";

@Component({
  selector: "app-modal",
  imports: [AddBudgetForm, DeleteBudgetForm],
  templateUrl: "./modal.html",
  styleUrl: "./modal.scss",
})
export class Modal {
  modalService = inject(ModalService);
  currentFormType = this.modalService.currentFormType;
  budgetService = inject(BudgetService);

  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

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
        // add some style asyncrounously, to make animations work
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
