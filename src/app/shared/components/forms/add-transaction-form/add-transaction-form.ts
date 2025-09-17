import { Component, inject, viewChild } from "@angular/core";
import { TransactionCategoryOption } from "../../../../models/models";
import { FormsModule, NgForm } from "@angular/forms";
import { TransactionService } from "../../../../services/transaction-service";
import { ModalService } from "../../../../services/modal-service";

@Component({
  selector: "app-add-transaction-form",
  imports: [FormsModule],
  templateUrl: "./add-transaction-form.html",
  styleUrl: "./add-transaction-form.scss",
})
export class AddTransactionForm {
  transactionService = inject(TransactionService);
  modalService = inject(ModalService);

  categoryTypes: TransactionCategoryOption[] = [
    "General",
    "Dining Out",
    "Entertainment",
    "Lifestyle",
    "Transportation",
    "Groceries",
    "Personal Care",
    "Education",
    "Bills",
    "Shopping",
  ];

  transactionForm = viewChild<NgForm>("transactionForm");
  formData = {
    avatar: "/images/avatars/company.png",
    name: "",
    amount: "",
    category: "General",
    recurring: false,
  };
  submitForm() {
    if (!this.transactionForm()!.valid) {
      return console.log("Form invalid");
    }

    const sentData = { ...this.formData, amount: Number(this.formData.amount) };

    this.transactionService.addTransaction(sentData);
    this.transactionForm()!.resetForm();
    this.modalService.closeModal();
  }
}
