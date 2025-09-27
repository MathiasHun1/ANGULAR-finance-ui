import { Component, inject, signal } from "@angular/core";
import { AuthLayout } from "../../shared/components/auth-layout/auth-layout";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-service";
import { RouterLink, Router, NavigationEnd } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-register",
  imports: [AuthLayout, FormsModule, RouterLink, CommonModule, TranslatePipe],
  templateUrl: "./register.html",
  styleUrl: "./register.scss",
})
export class Register {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authService.registrationSucceed.set(false);
        this.authService.clearError();
      }
    });
  }

  error = this.authService.hasError;
  succeed = this.authService.registrationSucceed;
  registerLoading = this.authService.isRegisterLoading;
  submitted = signal(false);

  usernameInput = "";
  passwordInput = "";
  emailInput = "";
  passwordConfirmInput = "";

  register(form: NgForm) {
    this.submitted.set(true);
    const credentials = form.value;

    if (!form.valid || !this.validatePasswordConfirm()) {
      console.error("Form invalid");
      return;
    }
    this.authService.register(credentials);
    this.registerLoading.set(true);
  }

  validatePasswordConfirm() {
    return this.passwordInput === this.passwordConfirmInput ? true : false;
  }
}
