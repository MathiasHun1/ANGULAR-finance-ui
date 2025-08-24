import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navigation as NavComponent } from "./shared/components/navigation/navigation";
import { Modal } from "./shared/components/modal/modal";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [RouterOutlet, NavComponent],
})
export class App {
  protected title = "Finance";
}
