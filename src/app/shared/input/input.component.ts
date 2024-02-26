import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) info!: string;
  @Input({ required: true }) type!: string;
  
  valor: any;

  @Output() valorChange = new EventEmitter<any>();

  onValorChange() {
    this.valorChange.emit(this.valor);
  }
}

