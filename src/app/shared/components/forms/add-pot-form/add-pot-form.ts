import { Component, inject, viewChild, signal } from "@angular/core";
import { PotsService } from "../../../../services/pots-service";
import { ModalService } from "../../../../services/modal-service";
import { FormsModule, NgForm } from "@angular/forms";
import { PotModel } from "../../../../models/models";
import { CustomSelectInput } from "../../custom-select-input/custom-select-input";

@Component({
  selector: "app-add-pot-form",
  imports: [CustomSelectInput, FormsModule],
  templateUrl: "./add-pot-form.html",
  styleUrl: "./add-pot-form.scss",
})
export class AddPotForm {
  potService = inject(PotsService);
  modalService = inject(ModalService);

  potsForm = viewChild<NgForm>("potsForm");

  categoryName = ""; // angular form lacks signal-support
  themeOptions = this.potService.themeOptions;
  selectedTheme = this.getFirstUnusedTheme();
  targetValue = ""; // angular form lacks signal-support

  submitForm() {
    if (!this.categoryName || !this.targetValue || !this.selectedTheme) {
      return;
    }

    const newPot: Omit<PotModel, "id"> = {
      name: this.categoryName,
      target: Number(this.targetValue),
      total: 0,
      theme: this.selectedTheme.color,
    };

    this.potService.addPot(newPot);
    this.clearForm();
    this.modalService.closeModal();
  }

  clearForm() {
    this.potsForm()?.resetForm();
  }

  getFirstUnusedTheme() {
    if (this.themeOptions()) {
      return this.themeOptions().find((option) => !option.inUse);
    }

    return undefined;
  }
}
