import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api-service";
import { FormsModule, NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  apiservice = inject(ApiService);
  authService = inject(AuthService);

  usernameInput = "";
  passwordInput = "";

  login(form: NgForm) {
    const credentials = form.value;
    this.authService.login(credentials);
  }

  exapmleLogin() {
    this.authService.login({ username: "Lajos", password: "valami" });
  }
}
