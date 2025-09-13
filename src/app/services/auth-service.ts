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
  isLoggedin = computed(() => {
    return !!localStorage.getItem("token");
  });

  login(credentials: { username: string; password: string }) {
    this.apiService.login(credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          console.log("login succesful!");
          this.router.navigate(["/"]);
        }
      },
      error: (err) => {
        console.log(err.error);
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
}
