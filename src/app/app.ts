import { Component, inject, signal, effect, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Navigation as NavComponent } from "./shared/components/navigation/navigation";
import { Modal } from "./shared/components/modal/modal";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth-service";
import { SettingsMenu } from "./shared/components/settings-menu/settings-menu";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [RouterOutlet, NavComponent, Modal, CommonModule, SettingsMenu],
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);

  protected title = "Finance";
  protected menuOpen = signal(true);
  protected showNavbar = signal(true);

  toggleNavState() {
    this.menuOpen.set(!this.menuOpen());
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }

  constructor() {
    effect(() => {
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }

        this.showNavbar.set(
          this.router.url !== "/login" && this.router.url !== "/register"
        ); // Hide navbar on login or register route
      });
    });
  }
}
