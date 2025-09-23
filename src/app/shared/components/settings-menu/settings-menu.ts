import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { AuthService } from "../../../services/auth-service";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-settings-menu",
  imports: [],
  templateUrl: "./settings-menu.html",
  styleUrl: "./settings-menu.scss",
})
export class SettingsMenu {
  authService = inject(AuthService);
  router = inject(Router);

  showSettings = signal(true);
  opened = signal(false);

  toggle() {
    this.opened.set(!this.opened());
  }

  logOutClick() {
    this.authService.logOut();
    this.opened.set(false);
    this.router.navigate(["/login"]);
  }

  deleteClick() {
    console.log("Delete acc");
  }

  // Hide settings on specific routes
  constructor() {
    effect(() => {
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }

        this.showSettings.set(
          this.router.url !== "/login" && this.router.url !== "/register"
        );
      });
    });
  }

  // Close popup on outside-click
  popupElement = viewChild<ElementRef<HTMLDivElement>>("popup");

  @HostListener("document: click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target;
    const popupElement = this.popupElement();

    if (!target || !popupElement) {
      return;
    }

    if (target !== popupElement.nativeElement) {
      this.opened.set(false);
    }
  }
}
