import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navigation as NavComponent } from "./shared/components/navigation/navigation";
import { Modal } from "./shared/components/modal/modal";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [RouterOutlet, NavComponent, Modal, CommonModule],
})
export class App {
  protected title = "Finance";
  menuOpen = signal(true);

  toggleNavState() {
    this.menuOpen.set(!this.menuOpen());
    console.log("clicked");
  }
}
