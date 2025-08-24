import { Component, forwardRef, input, signal } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ThemeOption } from "../../../models/models";

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
  options = input<ThemeOption[]>([]);
  placeHolder = input<string>("");

  value = signal<ThemeOption>({ name: "", color: "", inUse: false });
  isOpened = signal(false);

  writeValue(value: ThemeOption): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: ThemeOption) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState(isDisabled: boolean): void {}

  onChange(value: ThemeOption) {}
  onTouched() {}
  select(option: ThemeOption) {
    this.value.set(option);
    this.onChange(this.value());
    this.onTouched();
    this.isOpened.set(false);
  }

  toggleOpen() {
    this.isOpened.set(!this.isOpened());
  }
}
