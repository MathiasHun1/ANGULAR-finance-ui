import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-service";
import { AuthLayout } from "../../shared/components/auth-layout/auth-layout";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [FormsModule, AuthLayout],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  apiservice = inject(ApiService);
  authService = inject(AuthService);
  router = inject(Router);

  error = this.authService.hasError;

  usernameInput = "";
  passwordInput = "";

  login(form: NgForm) {
    const credentials = form.value;
    this.authService.login(credentials);
  }

  exapmleLogin() {
    this.authService.login({ username: "ExampleUser", password: "valami" });
  }

  goToRegister() {
    this.router.navigate(["/register"]);
    this.authService.clearError();
  }
}
