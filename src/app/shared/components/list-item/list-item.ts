import { Component, input } from "@angular/core";

@Component({
  selector: "app-list-item",
  imports: [],
  templateUrl: "./list-item.html",
  styleUrl: "./list-item.scss",
})
export class ListItem {
  name = input("");
  value = input<number>();
  borderColor = input("");
}
