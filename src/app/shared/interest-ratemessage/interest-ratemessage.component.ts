import { Component, Input } from "@angular/core";

@Component({
  selector: "app-interest-ratemessage",
  standalone: true,
  imports: [],
  templateUrl: "./interest-ratemessage.componente.html",
})
export class InterestRatemessageComponent {
  constructor() {}
  @Input({ required: true }) title!: string;
  @Input({ required: true }) rateMessage!: string;
  @Input({ required: true }) informacioExtra?: any;
  @Input({ required: true }) informacioExtra2?: any;
  @Input({ required: true }) unidadDeTiempo?: any;
  @Input({ required: true }) tipoTasa?: any;

  //informacioExtra
  //rateMessage
  //tittle

  ngOnInit() {
    console.log("Title:", this.title);
    console.log("Rate Message:", this.rateMessage);
    console.log("Informacion Extra:", this.informacioExtra);
    console.log("Informacion Extra 2:", this.informacioExtra2);
    console.log("Unidad de Tiempo:", this.unidadDeTiempo);
    console.log("Tipo Tasa:", this.tipoTasa);
  }
}
