import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-carrousel",
  standalone: true,
  imports: [],

  templateUrl: "./carrousel.component.html",
  styleUrl: "./carrousel.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarrouselComponent {
  constructor() {}

  @Input() tipo!: string;
  @Input() tipo_diferida?: string;

  @Output() tipoDiferidaChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    let val;
    if (
      changes["tipo_diferida"] &&
      changes["tipo_diferida"].currentValue !==
        changes["tipo_diferida"].previousValue
    ) {
      this.tipoDiferidaChange.emit(this.tipo_diferida);
    }

    switch (this.tipo_diferida) {
      case "Anticipada":
        val = "tipo2";
        break;
      case "Vencida":
        val = "tipo1";
        break;
    }
  }

  //tipo 1 es vencida z
  //tipo 2 es anticipada

  imagenes = [
    "../../../assets/formulas_annuities/anualidad_vencida_concepto.png",
    "../../../assets/formulas_annuities/anualidad_vencida_formulas_1.png",
    "../../../assets/formulas_annuities/anualidad_vencida_formulas_2.png",
    "../../../assets/formulas_annuities/anualidad_vencida_formulas_3.png",
    "../../../assets/formulas_annuities/anualidad_anticipada_concepto.png",
    "../../../assets/formulas_annuities/anualidad_anticipada_formulas_1.png",
    "../../../assets/formulas_annuities/anualidad_anticipada_formulas_2.png",
    "../../../assets/formulas_annuities/anualidad_anticipada_formulas_3.png",
    "../../../assets/formulas_annuities/anualidad_diferidad_tipo1.png",
    "../../../assets/formulas_annuities/anualidad_diferidad_tipo1_formulas.png",
    "../../../assets/formulas_annuities/anualidad_diferidad_tipo2.png",
    "../../../assets/formulas_annuities/anualidad_diferidad_tipo2_formulas.png",
  ];
}
