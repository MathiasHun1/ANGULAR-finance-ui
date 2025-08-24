import { Component, effect, ElementRef, input, output } from "@angular/core";
import { viewChild } from "@angular/core";
import {} from "@angular/core";

@Component({
  selector: "app-modal",
  imports: [],
  templateUrl: "./modal.html",
  styleUrl: "./modal.scss",
})
export class Modal {
  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  title = input<string>("");
  subTitle = input<string>("");
  modalOpened = input(false);
  modalClosed = output<string>();

  constructor() {
    // manage the modal opened state based on the input signal
    effect(() => {
      if (!this.modalOpened()) {
        this.modal()!.nativeElement.style.display = "none";
        this.modal()!.nativeElement.classList.remove("visible");
      } else {
        this.modal()!.nativeElement.style.display = "block";
        // add some style asyncrounously, to make animations work
        setTimeout(() => {
          this.modal()!.nativeElement.classList.add("visible");
        }, 0);
      }
    });
  }

  onBackdropClick(event: MouseEvent) {
    const modal = this.modal();

    // check if click happens on the backdrop element
    if (event.target === modal!.nativeElement) {
      this.modalClosed.emit("close");
    }
  }
}
