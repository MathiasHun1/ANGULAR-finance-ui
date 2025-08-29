import { Injectable, signal } from "@angular/core";
import { ModalFormType } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  opened = signal(false);

  currentFormType = signal<ModalFormType | null>(null);

  openModal(formType: ModalFormType) {
    this.currentFormType.set(formType);
    this.opened.set(true);
  }

  closeModal() {
    this.opened.set(false);
    this.currentFormType.set(null);
  }
}
