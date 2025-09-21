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
    isIncome: false,
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

    const amount = Number(this.formData.amount);
    const sentData = {
      avatar: this.formData.avatar,
      name: this.formData.name,
      amount: this.formData.isIncome ? amount : amount * -1,
      category: this.formData.category,
      recurring: this.formData.recurring,
    };

    this.transactionService.addTransaction(sentData);
    this.transactionForm()!.resetForm();
    this.modalService.closeModal();
  }
}
