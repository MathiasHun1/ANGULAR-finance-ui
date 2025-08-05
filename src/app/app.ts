import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navigation as NavComponent } from "./components/navigation/navigation";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [RouterOutlet, NavComponent],
})
export class App {
  protected title = "finance";
}
