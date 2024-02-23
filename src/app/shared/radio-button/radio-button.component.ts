import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [],
  template: `<div class="flex gap-2">
    <p class="text-lg text-black font-semibold">{{ title }}</p>
    <div class="mt-1">
      <label class="container">
        <input checked="checked" name="radio" type="radio" />
        <div class="checkmark"></div>
      </label>
    </div>
  </div> `,
  styleUrl: './radio-button.component.css',
})
export class RadioButtonComponent {
  constructor() {}

  @Input({ required: true }) title!: string;

  @Input({ required: true }) value!: string;

  @Input({ required: true }) id!: string;
}
