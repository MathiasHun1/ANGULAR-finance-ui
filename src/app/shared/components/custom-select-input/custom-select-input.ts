import {
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ThemeOption } from "../../../models/models";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-custom-select-input",
  templateUrl: "./custom-select-input.html",
  styleUrl: "./custom-select-input.scss",
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomSelectInput),
    },
  ],
})
export class CustomSelectInput implements ControlValueAccessor {
  options = input<ThemeOption[]>();
  defaultValue = input<ThemeOption>();

  value = signal<ThemeOption | undefined>(undefined);
  isOpened = signal(false);
  listElement = viewChild<ElementRef<HTMLUListElement>>("optionsList");

  /**
   *
   * Required for angular
   */
  writeValue(value: ThemeOption): void {
    if (value) {
      if (this.defaultValue()) {
        this.value.set(this.defaultValue());
        return;
      }
    }

    this.value.set(undefined);
  }

  registerOnChange(fn: (value: ThemeOption) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  onChange(value: ThemeOption | undefined) {}
  onTouched() {}

  /*******************************/

  select(option: ThemeOption) {
    if (option.inUse) {
      return;
    }

    this.value.set(option);
    this.onChange(this.value());
    this.onTouched();
    this.isOpened.set(false);
  }

  toggleOpen() {
    this.isOpened.set(!this.isOpened());
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target;
    const listEleemnt = this.listElement();
    if (!target || !listEleemnt) {
      return;
    }

    if (target !== listEleemnt.nativeElement) {
      this.isOpened.set(false);
    }
  }
}
