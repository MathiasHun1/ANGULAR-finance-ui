import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { Router } from "@angular/router";
import { AuthError } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private token = signal<string>("");
  private user = signal<string | null>(null);

  exapmleUser = signal(false);
  isLoggedin = signal(false);
  registrationSucceed = signal(false);
  hasError = signal<AuthError | null>(null);

  isLoginLoading = signal(false);
  isExampleLoginLoading = signal(false);
  isRegisterLoading = signal(false);

  login(credentials: { username: string; password: string }) {
    this.apiService.login(credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", response.username);
          this.isLoggedin.set(true);
          this.isLoginLoading.set(false);
          this.router.navigate(["/"]);
          if (credentials.username === "ExampleUser") {
            this.hasError.set(null);
            this.isExampleLoginLoading.set(false);
            this.exapmleUser.set(true);
          } else {
            this.hasError.set(null);
          }
        }
      },
      error: (err) => {
        console.log(err.error);
        this.hasError.set({
          type: "LoginError",
          message: err.error.error,
        });
        this.isLoginLoading.set(false);
        this.isExampleLoginLoading.set(false);
      },
    });
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.token.set("");
    this.isLoggedin.set(false);
    this.exapmleUser.set(false);
  }

  register(credentials: { username: string; password: string }) {
    this.apiService.register(credentials).subscribe({
      next: (result) => {
        this.registrationSucceed.set(true);
        this.isRegisterLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isRegisterLoading.set(false);
        if (err.status === 409) {
          this.hasError.set({
            type: "RegistrationError",
            message: err.error.error,
          });
        }
      },
    });
  }

  deleteUserAccount() {
    this.apiService.deletUser().subscribe({
      next: (result) => {
        this.logOut();
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        if (err.status === 403) {
          this.hasError.set({
            type: "ForbiddenDeleteError",
            message: err.error,
          });
        }
      },
    });
  }

  getToken() {
    const token = localStorage.getItem("token");
    if (token) {
      this.token.set(token);
    }
    return this.token();
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  clearError() {
    this.hasError.set(null);
  }

  initAuth() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    this.token.set(token || "");
    this.user.set(user);
    this.isLoggedin.set(!!token);

    if (user === "ExampleUser") {
      this.exapmleUser.set(true);
    } else {
      this.exapmleUser.set(false);
    }
  }
}
