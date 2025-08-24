import { Component, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-custom-select-input",
  templateUrl: "./custom-select-input.html",
  styleUrl: "./custom-select-input.scss",
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomSelectInput),
    },
  ],
})
export class CustomSelectInput implements ControlValueAccessor {
  options = input<string[]>([]);
  placeHolder = input<string>("");

  value = signal<string>("");
  isOpened = signal(false);

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  onChange(value: string) {}
  onTouched() {}

  select(option: string) {
    this.value.set(option);
    this.onChange(this.value());
    this.onTouched();
    this.isOpened.set(false);
  }

  toggleOpen() {
    this.isOpened.set(!this.isOpened());
  }
}
