import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core";

@Component({
  selector: "app-carrousel",
  standalone: true,
  imports: [],

  templateUrl: "./carrousel.component.html",
  styleUrl: "./carrousel.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarrouselComponent {
  @Input({ required: true }) tipo!: string;

  imagenes = [
    "../../../assets/formulas_annuities/anualidad_vencida_formulas.png",
    "../../../assets/formulas_annuities/anualidad_vencida_concepto.png",
    "../../../assets/formulas_annuities/anualidad_anticipada_concepto.png",
    "../../../assets/formulas_annuities/anualidad_anticipada_formulas.png",
  ];
}
