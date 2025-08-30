import { Component, ElementRef, OnInit, viewChild } from "@angular/core";

@Component({
  selector: "app-loading-status",
  imports: [],
  templateUrl: "./loading-status.html",
  styleUrl: "./loading-status.scss",
})
export class LoadingStatus implements OnInit {
  barElement = viewChild<ElementRef<HTMLDivElement>>("barElement");

  ngOnInit(): void {
    const duration = 60;
    let elapsed = 0;

    const update = () => {
      elapsed++;
      const progress = (elapsed / duration) * 100;

      this.barElement()!.nativeElement.style.width = `${progress}%`;

      if (elapsed < duration) {
        setTimeout(update, 1000);
      }
    };

    update();
  }
}
