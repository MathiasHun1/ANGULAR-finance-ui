import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
} from "@angular/core";
import { FormsModule, NgForm, NgModel } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PotsService } from "../../../../services/pots-service";
import { ModalService } from "../../../../services/modal-service";
import { BalanceService } from "../../../../services/balance-service";

@Component({
  selector: "app-add-to-pot-form",
  imports: [FormsModule, CommonModule],
  templateUrl: "./add-to-pot-form.html",
  styleUrl: "./add-to-pot-form.scss",
})
export class AddToPotForm {
  // --- Dependencies ---
  potsService = inject(PotsService);
  modalService = inject(ModalService);
  balanceService = inject(BalanceService);

  // --- Template refs ---
  form = viewChild<NgForm>("addToPotForm");
  amountControl = viewChild<NgModel>("amountControl");
  // --- Reactive state ---
  amount = signal("");

  // --- Original values ---
  target = this.potsService.activePot().target;
  currentRatio =
    (this.potsService.activePot().total / this.potsService.activePot().target) *
    100;

  // --- Computed helpers ---
  addedRatio = computed(() => {
    return (Number(this.amount()) / this.potsService.activePot().target) * 100;
  });

  totalRatio = computed(() => {
    return this.currentRatio + this.addedRatio();
  });

  newAmount = computed(() => {
    return this.potsService.activePot().total + Number(this.amount());
  });

  // --- Validation / Lifecycle ---

  constructor() {
    effect(() => this.validateAmount());
  }

  validateAmount() {
    const availableBalance = this.balanceService.balanceData()?.current || 0;
    const amount = Number(this.amount());

    const formInstance = this.form();
    const amountControl = this.amountControl();

    if (!formInstance || !amountControl) {
      console.warn("Form or amount control not found");
      return;
    }

    if (amount > availableBalance) {
      amountControl.control.setErrors({ insufficientFunds: true });
    }
  }

  // --- Actions ---
  submitForm() {
    // Return if form is invalid
    if (!this.form()?.valid) {
      return;
    }
    // Check if sufficient funds are available
    const amount = Number(this.amount());
    const availableBalance = this.balanceService.balanceData()?.current || 0;

    if (amount > availableBalance) {
      return console.warn("Insufficient funds in current balance");
    }

    this.balanceService.withdrawFromCurrent(amount);

    const updatedPot = { ...this.potsService.activePot() };
    updatedPot.total += Number(this.amount());
    this.potsService.updatePot(updatedPot);
    this.closeForm();
  }

  closeForm() {
    this.form()?.resetForm();
    this.modalService.closeModal();
  }
}
