import { Component } from "@angular/core";
import { InterestRateConverterInputComponent } from "../interest-rate-converter-input/interest-rate-converter-input.component";

@Component({
  selector: "app-interest-rate-converter",
  standalone: true,
  templateUrl: "./interest-rate-converter.component.html",
  imports: [InterestRateConverterInputComponent],
})
export class InterestRateConverterComponent {
  tasa_interes_efectiva_periodica: number = 0;
  recibirTasaEfectiva(tasaEfectiva: number) {
    this.tasa_interes_efectiva_periodica = tasaEfectiva;
  }
}
