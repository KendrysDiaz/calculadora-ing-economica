import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [],
  template: `<div class="flex gap-2">
    <p class="text-lg text-black font-semibold">{{ label }}</p>
    <div class="mt-1">
      <label class="container">
        <input
          checked="checked"
          name="typeInterestRate"
          type="radio"
          value="{{ value }}"
          (change)="onSelect($event)"
        />
        <div class="checkmark"></div>
      </label>
    </div>
  </div> `,
  styleUrl: './radio-button.component.css',
})
export class RadioButtonComponent {
  constructor() {}

  onSelect(event: any) {
    console.log(this.label);
    const selectedValue = event.target.value;
    this.EventSelectTypeRate.emit(selectedValue);
  }

  @Output() EventSelectTypeRate = new EventEmitter<string>();

  @Input({}) label!: string;
  @Input({}) value!: string;
  @Input({}) id!: string;
}
