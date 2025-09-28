import { Component, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-navigation",
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  templateUrl: "./navigation.html",
  styleUrl: "./navigation.scss",
})
export class Navigation {
  menuOpen = input.required<boolean>();

  isVisible = signal(true);
  opened = signal(true);
}
