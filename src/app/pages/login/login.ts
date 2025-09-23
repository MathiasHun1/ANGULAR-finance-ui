import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-service";
import { AuthLayout } from "../../shared/components/auth-layout/auth-layout";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  imports: [FormsModule, AuthLayout, CommonModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  apiservice = inject(ApiService);
  authService = inject(AuthService);
  router = inject(Router);

  error = this.authService.hasError;
  loginLoading = this.authService.isLoginLoading;
  exampleLoading = this.authService.isExampleLoginLoading;

  usernameInput = "";
  passwordInput = "";

  login(form: NgForm) {
    const credentials = form.value;
    this.authService.login(credentials);
    this.authService.isLoginLoading.set(true);
  }

  exapmleLogin() {
    this.authService.login({ username: "ExampleUser", password: "valami" });
    this.exampleLoading.set(true);
  }

  goToRegister() {
    this.router.navigate(["/register"]);
    this.authService.clearError();
  }
}
