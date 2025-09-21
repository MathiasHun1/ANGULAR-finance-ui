import { Component, inject, signal } from "@angular/core";
import { AuthLayout } from "../../shared/components/auth-layout/auth-layout";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-register",
  imports: [AuthLayout, FormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.scss",
})
export class Register {
  authService = inject(AuthService);

  error = this.authService.hasError;
  submitted = signal(false);
  usernameInput = "";
  passwordInput = "";
  passwordConfirmInput = "";

  register(form: NgForm) {
    this.submitted.set(true);
    const credentials = form.value;

    if (!form.valid || !this.validatePasswordConfirm()) {
      console.error("Form invalid");
      return;
    }
    console.log("form valid");
    this.authService.register(credentials);
  }

  validatePasswordConfirm() {
    return this.passwordInput === this.passwordConfirmInput ? true : false;
  }
}
