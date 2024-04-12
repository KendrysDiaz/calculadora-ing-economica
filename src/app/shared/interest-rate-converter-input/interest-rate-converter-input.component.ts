import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-interest-rate-converter-input",
  standalone: true,
  imports: [],
  templateUrl: "./interest-rate-converter-input.component.html",
  styleUrl: "./interest-rate-converter-input.component.css",
})
export class InterestRateConverterInputComponent {
  @Input({ required: true }) titulo!: string;
  @Output() tasa_interes_efectiva_calculada = new EventEmitter<number>();
  @Input({ required: false }) frecuencia_capitalizacion?: any;
  input_val: number = 0;
  interes_Periocidad: string = "";
  tasa_interes_efectiva_periodica: number = 0;

  periodos = [
    { nombre: "Anual", equivalencia: 1 },
    { nombre: "Semestral", equivalencia: 2 },
    { nombre: "Cuatrimestral", equivalencia: 3 },
    { nombre: "Trimestral", equivalencia: 4 },
    { nombre: "Bimestral", equivalencia: 6 },
    { nombre: "Mensual", equivalencia: 12 },
    { nombre: "Dario", equivalencia: 360 },
  ];

  on_Change_input(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.input_val = parseFloat(target.value);
  }

  on_Periodo_Change(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.interes_Periocidad = target.value;
  }

  obtener_equivalenci(nombreFrecuencia: string) {
    for (const periodo of this.periodos) {
      if (periodo.nombre === nombreFrecuencia) {
        return periodo.equivalencia;
      }
    }
    return 0;
  }

  on_FrecuenciaCapitalizacion_Change(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.frecuencia_capitalizacion = target.value;
  }

  convertidor(tipo: string) {
    switch (tipo) {
      case "TEA_TE?":
        let m = this.obtener_equivalenci(this.interes_Periocidad);
        let numero = 1 + this.input_val / 100;
        this.tasa_interes_efectiva_periodica = Math.pow(numero, 1 / m) - 1;
        break;
      case "TN?_TE?":
        let val = this.obtener_equivalenci(this.interes_Periocidad);
        let j = this.input_val * val;
        let val_2 = this.obtener_equivalenci(this.frecuencia_capitalizacion);
        this.tasa_interes_efectiva_periodica = j / 100 / val_2;
        break;
      default:
        break;
    }

    this.tasa_interes_efectiva_calculada.emit(
      this.tasa_interes_efectiva_periodica
    );
  }
}
