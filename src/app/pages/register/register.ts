import { Component, inject } from "@angular/core";
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

  usernameInput = "";
  passwordInput = "";

  register(form: NgForm) {
    const credentials = form.value;
    this.authService.register(credentials);
  }
}
