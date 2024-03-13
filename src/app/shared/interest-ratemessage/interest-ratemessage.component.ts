import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-interest-ratemessage',
  standalone: true,
  imports: [],
  templateUrl: './interest-ratemessage.componente.html',
})
export class InterestRatemessageComponent {
  constructor() {}
  @Input({ required: true }) title!: string;
  @Input({ required: true }) rateMessage!: string;
  @Input({ required: true }) informacioExtra?: any;
  @Input({ required: true }) unidadDeTiempo?: any;
  @Input({ required: true }) tipoTasa?: any;
}
