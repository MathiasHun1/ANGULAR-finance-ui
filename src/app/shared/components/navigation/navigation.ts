import { Component, effect, input, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-navigation",
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: "./navigation.html",
  styleUrl: "./navigation.scss",
})
export class Navigation {
  menuOpen = input.required<boolean>();

  isVisible = signal(true);
  opened = signal(true);

  constructor() {
    effect(() => console.log(this.menuOpen()));
  }
}
