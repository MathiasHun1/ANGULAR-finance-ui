import { Component, inject, signal, viewChild } from "@angular/core";
import { PotsService } from "../../../../services/pots-service";
import { ModalService } from "../../../../services/modal-service";
import { FormsModule, NgForm } from "@angular/forms";
import { ThemeOption } from "../../../../models/models";
import { PotModel } from "../../../../models/models";
import { CustomSelectInput } from "../../custom-select-input/custom-select-input";

@Component({
  selector: "app-edit-pot-form",
  imports: [FormsModule, CustomSelectInput],
  templateUrl: "./edit-pot-form.html",
  styleUrl: "./edit-pot-form.scss",
})
export class EditPotForm {
  potService = inject(PotsService);
  modalService = inject(ModalService);

  potsForm = viewChild<NgForm>("potsForm");

  activePot = this.potService.activePot();
  categoryName = signal(this.activePot.name);
  themeOptions = this.potService.themeOptions;
  selectedTheme = this.getActiveTheme();

  targetValue = signal(this.activePot.target);

  submitForm() {
    console.log(this.selectedTheme);

    if (!this.categoryName || !this.targetValue || !this.selectedTheme) {
      return;
    }

    const updatedPot: PotModel = {
      name: this.categoryName(),
      target: Number(this.targetValue()),
      total: this.activePot.total,
      theme: this.selectedTheme.color,
      id: this.activePot.id,
    };

    this.potService.updatePot(updatedPot);
    this.clearForm();
    this.modalService.closeModal();
  }

  clearForm() {
    this.potsForm()?.resetForm();
  }

  getActiveTheme() {
    const themeItem = this.themeOptions().find(
      (t) => t.color.toLowerCase() === this.activePot.theme.toLowerCase()
    );

    return themeItem;
  }
}
