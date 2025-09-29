import { inject, Injectable, signal } from "@angular/core";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private translateService = inject(TranslateService);
  currentLang = signal(this.translateService.getCurrentLang());

  toggleLang() {
    if (this.currentLang() === "en") {
      this.currentLang.set("hu");
      this.translateService.use("hu");
    } else {
      this.currentLang.set("en");
      this.translateService.use("en");
    }
  }
}
