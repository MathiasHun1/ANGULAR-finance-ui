import { Component, inject, signal } from "@angular/core";
import { AuthService } from "../../../../services/auth-service";
import { Router } from "@angular/router";
import { ModalService } from "../../../../services/modal-service";

@Component({
  selector: "app-confirm-acount-deletion",
  imports: [],
  templateUrl: "./confirm-acount-deletion.html",
  styleUrl: "./confirm-acount-deletion.scss",
})
export class ConfirmAcountDeletion {
  authService = inject(AuthService);
  router = inject(Router);
  modalService = inject(ModalService);

  exampleUserError = signal(false);

  deleteClick() {
    if (this.authService.exapmleUser()) {
      this.exampleUserError.set(true);
      setTimeout(() => {
        this.exampleUserError.set(false);
      }, 4000);
    } else {
      this.authService.deleteUserAccount();
      this.modalService.closeModal();
    }
  }
}
