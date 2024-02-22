import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css',
})
export class RadioButtonComponent {
  constructor() {}

  @Input({ required: true }) title!: string;

  @Input({ required: true }) value!: string;

  @Input({ required: true }) id!: string;
}
