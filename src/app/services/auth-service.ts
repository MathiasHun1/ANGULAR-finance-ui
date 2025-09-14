import { computed, inject, Injectable, signal } from "@angular/core";
import { ApiService } from "./api-service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private token = signal<string>("");

  isLoggedin = signal(false);

  // Init the token and the state on app start
  constructor() {
    const token = localStorage.getItem("token");
    this.token.set(token || "");
    this.isLoggedin.set(!!token);
  }

  login(credentials: { username: string; password: string }) {
    this.apiService.login(credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          this.isLoggedin.set(true);
          this.router.navigate(["/"]);
        }
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  logOut() {
    localStorage.removeItem("token");
    this.token.set("");
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
}
