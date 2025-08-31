import { Component, OnInit, signal } from "@angular/core";

@Component({
  selector: "app-loading-status",
  imports: [],
  templateUrl: "./loading-status.html",
  styleUrl: "./loading-status.scss",
})
export class LoadingStatus implements OnInit {
  progress = signal(0);

  ngOnInit(): void {
    const duration = 30;
    let elapsed = 0;

    const update = () => {
      const progress = (elapsed / duration) * 100;
      this.progress.set(progress);

      elapsed++;
      if (elapsed < duration) {
        setTimeout(update, 1000);
      }
    };

    update();
  }
}
