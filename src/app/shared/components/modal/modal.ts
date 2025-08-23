import { Component, ElementRef } from "@angular/core";
import { signal, viewChild } from "@angular/core";
import { OnInit } from "@angular/core";
import { CommonModule, NgClass } from "@angular/common";

@Component({
  selector: "app-modal",
  imports: [NgClass],
  templateUrl: "./modal.html",
  styleUrl: "./modal.scss",
})
export class Modal {
  modal = viewChild<ElementRef<HTMLDivElement>>("modal");

  modalOpened = signal(false);

  openModal() {
    this.modal()!.nativeElement.style.display = "block";
    setTimeout(() => {
      this.modalOpened.set(true);
    }, 10);
  }

  closeModal() {
    this.modal()!.nativeElement.style.display = "none";
    this.modalOpened.set(false);
  }

  onBackdropClick(event: MouseEvent) {
    const modal = this.modal();

    if (event.target === modal!.nativeElement) {
      this.closeModal();
    }
  }
}
