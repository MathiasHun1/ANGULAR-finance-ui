import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  opened = signal(false);
}
