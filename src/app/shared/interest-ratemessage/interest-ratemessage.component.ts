import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interest-ratemessage',
  standalone: true,
  imports: [],
  template: `<div class="flex justify-between">
    <h4 class="text-3xl mt-5 text-black font-bold mb-3">{{ title }}</h4>
    <h1 class="text-7xl font-bold text-green-900 ml-5 ">{{ rateMessage }} %</h1>
  </div>`,
})
export class InterestRatemessageComponent {
  constructor() {}
  @Input({ required: true }) title!: string;

  @Input({ required: true }) rateMessage!: string;
}
