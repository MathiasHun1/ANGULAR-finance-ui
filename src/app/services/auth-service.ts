import { inject, Injectable, signal } from "@angular/core";
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

  exapmleUser = signal(false);
  isLoggedin = signal(false);
  registrationSucceed = signal(false);
  hasError = signal<AuthError | null>(null);

  // Init the token and the state on app start
  constructor() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    this.token.set(token || "");
    this.isLoggedin.set(!!token);
    if (user === "ExampleUser") {
      this.exapmleUser.set(true);
    }
  }

  login(credentials: { username: string; password: string }) {
    this.apiService.login(credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", response.username);
          this.isLoggedin.set(true);
          this.router.navigate(["/"]);
          if (credentials.username === "ExampleUser") {
            this.exapmleUser.set(true);
            this.hasError.set(null);
          } else {
            this.exapmleUser.set(false);
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
      },
    });
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.token.set("");
    this.exapmleUser.set(false);
    this.isLoggedin.set(false);
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

  register(credentials: { username: string; password: string }) {
    this.apiService.register(credentials).subscribe({
      next: (result) => {
        this.registrationSucceed.set(true);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 409) {
          this.hasError.set({
            type: "RegistrationError",
            message: err.error.error,
          });
        }
      },
    });
  }

  clearError() {
    this.hasError.set(null);
  }
}
