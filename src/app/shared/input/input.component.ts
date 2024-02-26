import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  template: `<div class="flex gap-4 justify-between mb-3">
    <h3 class="text-base text-black font-semibold">{{ title }}</h3>
    <input
      class="input w-9/12"
      [value]="info"
      (change)="onSelect($event)"
      type="number"
    />
  </div> `,
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() title!: string;
  @Input() info!: string;
  @Output() infoChange = new EventEmitter<string>();
  @Input() control!: FormControl;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('titulo:', this.title);
  }

  onSelect(event: any) {
    const selectedValue = event.target.value;
    this.infoChange.emit(selectedValue);
  }
}
