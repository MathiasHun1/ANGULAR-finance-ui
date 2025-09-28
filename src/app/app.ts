import { Component, inject, signal, effect, OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Navigation as NavComponent } from "./shared/components/navigation/navigation";
import { Modal } from "./shared/components/modal/modal";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth-service";
import { SettingsMenu } from "./shared/components/settings-menu/settings-menu";
import { TranslateService } from "@ngx-translate/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [
    RouterOutlet,
    NavComponent,
    Modal,
    CommonModule,
    SettingsMenu,
    TranslatePipe,
  ],
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);
  translate = inject(TranslateService);

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
    this.authService.initAuth();

    effect(() => {
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }

        // Hide navbar on login or register route
        this.showNavbar.set(
          this.router.url !== "/login" && this.router.url !== "/register"
        );
      });
    });
  }

  setLanguage(lang: "en" | "hu") {
    this.translate.use(lang);
  }
}
