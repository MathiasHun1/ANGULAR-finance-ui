import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { AuthService } from "../../../services/auth-service";
import { NavigationEnd, Router } from "@angular/router";
import { ModalService } from "../../../services/modal-service";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../../services/language-service";

@Component({
  selector: "app-settings-menu",
  imports: [TranslatePipe],
  templateUrl: "./settings-menu.html",
  styleUrl: "./settings-menu.scss",
})
export class SettingsMenu {
  authService = inject(AuthService);
  router = inject(Router);
  modalService = inject(ModalService);
  translate = inject(TranslateService);
  langService = inject(LanguageService);

  imageUrl = input();

  showSettings = signal(true);
  opened = signal(false);
  currentLang = this.langService.currentLang;

  toggle() {
    this.opened.set(!this.opened());
  }

  logOutClick() {
    this.opened.set(false);
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }

  openDeleteModalClick() {
    this.modalService.openModal("confirm-account-deletion");
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
