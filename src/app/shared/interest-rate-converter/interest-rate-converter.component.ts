import { Component, EventEmitter, Input, Output } from "@angular/core";
import { InterestRateConverterInputComponent } from "../interest-rate-converter-input/interest-rate-converter-input.component";

@Component({
  selector: "app-interest-rate-converter",
  standalone: true,
  templateUrl: "./interest-rate-converter.component.html",
  imports: [InterestRateConverterInputComponent],
})
export class InterestRateConverterComponent {
  tasa_interes_efectiva_periodica: number = 0;
  val_frecuencia: number = 0;
  frecuencia_interes_efectiva_periodica: string = "";
  @Output() estado = new EventEmitter<boolean>();
  @Output() tasa_interes_efectiva_calculada = new EventEmitter<{
    tasa: number;
    val_frecuencia: number;
    frecuencia: string;
  }>();

  recibirTasaEfectiva(tasaEfectiva: any) {
    console.log(
      tasaEfectiva.tasa,
      "frecuencia: ",
      tasaEfectiva.val_frecuencia,
      ": ",
      tasaEfectiva.frecuencia
    );
    this.tasa_interes_efectiva_periodica = tasaEfectiva.tasa;
    this.val_frecuencia = tasaEfectiva.val_frecuencia;
    this.frecuencia_interes_efectiva_periodica = tasaEfectiva.frecuencia;
  }

  emitirDatos() {
    this.estado.emit(false); // Emite el estado actual (false)
    this.tasa_interes_efectiva_calculada.emit({
      tasa: this.tasa_interes_efectiva_periodica,
      val_frecuencia: this.val_frecuencia,
      frecuencia: this.frecuencia_interes_efectiva_periodica,
    });
  }

  clear() {
    this.emitirDatos(); // Emite el estado y la tasa de interés efectiva al limpiar
  }
}
