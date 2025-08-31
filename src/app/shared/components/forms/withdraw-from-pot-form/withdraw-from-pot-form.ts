import {
  Component,
  inject,
  viewChild,
  computed,
  signal,
  effect,
} from "@angular/core";
import { PotsService } from "../../../../services/pots-service";
import { ModalService } from "../../../../services/modal-service";
import { FormsModule, NgControl, NgForm, NgModel } from "@angular/forms";
import { BalanceService } from "../../../../services/balance-service";

@Component({
  selector: "app-withdraw-from-pot-form",
  imports: [FormsModule],
  templateUrl: "./withdraw-from-pot-form.html",
  styleUrl: "./withdraw-from-pot-form.scss",
})
export class WithdrawFromPotForm {
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
  originalTotalValue = this.potsService.activePot().total;
  originaltargetValue = this.potsService.activePot().target;
  originalRatio = (this.originalTotalValue / this.originaltargetValue) * 100;

  // --- Computed helpers ---

  afterWithdrawTotalRatio = computed(() => {
    const result =
      (this.newAmount() / this.potsService.activePot().target) * 100;

    if (
      !this.amount() ||
      Number(this.amount()) > this.originalTotalValue ||
      isNaN(Number(this.amount()))
    ) {
      return this.originalRatio;
    }

    return result;
  });

  withdrawedAmountRatio = computed(() => {
    const result = (Number(this.amount()) / this.originaltargetValue) * 100;

    if (Number(this.amount()) > this.originalTotalValue) {
      return 0;
    }

    return result;
  });

  totalRatio = computed(() => {
    return (this.newAmount() / this.potsService.activePot().target) * 100;
  });

  newAmount = computed(() => {
    const result = this.potsService.activePot().total - Number(this.amount());

    return result >= 0 ? result : 0;
  });

  // --- Lifecycle / Validation ---
  constructor() {
    effect(() => this.validateAmount());
  }

  validateAmount() {
    const inputAmount = Number(this.amount());
    const availableAmount = this.originalTotalValue;

    const formInstance = this.form();
    const amountControl = this.amountControl();

    if (!formInstance || !amountControl) {
      return;
    }

    if (inputAmount > availableAmount) {
      amountControl.control.setErrors({ maxAmount: true });
    } else {
      if (amountControl.hasError("maxAmount")) {
        amountControl.control.setErrors(null);
      }
    }
  }

  // --- Actions ---
  submitForm() {
    if (!this.form()?.valid) {
      return;
    }

    const updatedPot = { ...this.potsService.activePot() };
    updatedPot.total -= Number(this.amount());

    this.potsService.updatePot(updatedPot);
    this.balanceService.addToCurrent(Number(this.amount()));
    this.closeForm();
  }

  closeForm() {
    this.form()?.resetForm();
    this.modalService.closeModal();
  }
}
