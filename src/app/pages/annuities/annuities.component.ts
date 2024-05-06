import { AnnuitiesService } from "./../../service/annuities.service";
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { InputComponent } from "../../shared/input/input.component";
import { InterestRateConverterComponent } from "../../shared/interest-rate-converter/interest-rate-converter.component";
import { annuitiesInterface } from "../../interface/annuities.interface";
import { AnnutiesConvertionTimeFunctionsService } from "../../service/annuties_functions/annuties-convertion-time-functions.service";
import { CarrouselComponent } from "../../shared/carrousel/carrousel.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-annuities",
  standalone: true,
  templateUrl: "./annuities.component.html",
  styleUrls: [
    "./annuities.component.css",
    "../../shared/styles/input.style.css",
    "../../shared/styles/input_2.style.css",
  ],
  imports: [
    InputComponent,
    ReactiveFormsModule,
    InterestRateConverterComponent,
    CarrouselComponent,
  ],
})
export default class AnnuitiesComponent {
  tasa_interes_efectiva: number = 0;
  showModal: boolean = false;
  valorSeleccionado: string = "Vencida";
  valorSeleccionado_2: string = "Vencida"; // Propiedad para almacenar el valor seleccionado
  resultado: any;
  periodos: { nombre: string; equivalencia: number }[];
  annuities_Form: FormGroup;
  diferida: any = false;
  tipo_diferidad: any = true;
  constructor(
    private annuitiesService: AnnuitiesService,
    lista_periodos: AnnutiesConvertionTimeFunctionsService
  ) {
    this.periodos = lista_periodos.periodos_normal;
    this.annuities_Form = new FormGroup({
      tipo_anualidad: new FormControl(""),
      valor_final: new FormControl(0),
      valor_presente: new FormControl(0),
      val_frecuencia_tasa: new FormControl(0),
      val_frecuencia_tiempo: new FormControl(0),
      renta: new FormControl(0),
      num_periodos: new FormControl(0),
      num_periodos_gracia: new FormControl(0),
      tasa_interes_efectiva: new FormControl(0),
    });
  }

  limpiarCampos() {
    this.annuities_Form.reset({
      tipo_anualidad: "",
      valor_final: 0,
      valor_presente: 0,
      val_frecuencia_tasa: 0,
      val_frecuencia_tiempo: 0,
      renta: 0,
      num_periodos: 0,
      num_periodos_gracia: 0,
      tasa_interes_efectiva: 0,
    });
    this.resultado = "";
    this.restablecerSelects();
  }

  showContent(event: Event) {
    event.preventDefault();
    let estado_actual = this.showModal;
    this.showModal = !estado_actual;
  }

  recibirEstado(estado: boolean) {
    this.showModal = estado;
  }

  recibirTasaEfectiva(tasaEfectiva: {
    tasa: number;
    val_frecuencia: number;
    frecuencia: string;
  }) {
    this.annuities_Form
      .get("tasa_interes_efectiva")
      ?.setValue(tasaEfectiva.tasa);

    this.annuities_Form
      .get("val_frecuencia_tasa")
      ?.setValue(tasaEfectiva.val_frecuencia);

    this.annuities_Form
      .get("tasa_interes_efectiva")
      ?.setValue(tasaEfectiva.tasa);
  }

  on_Periodo_Change(event: Event) {
    const target = event.target as HTMLSelectElement;
    for (const periodo of this.periodos) {
      if (periodo.nombre === target.value) {
        this.annuities_Form
          .get("val_frecuencia_tiempo")
          ?.setValue(periodo.equivalencia);
      }
    }
  }

  restablecerSelects() {
    var selects = document.querySelectorAll("select");
    selects.forEach(function (select) {
      select.selectedIndex = 0;
    });
    this.valorSeleccionado_2 = "Vencida";
  }

  onRadioChange(valor: string) {
    this.valorSeleccionado = valor;
    this.annuities_Form.get("tipo_anualidad")?.setValue(this.valorSeleccionado);
    this.limpiarCampos();
  }

  onRadioChange_2(valor: string) {
    this.valorSeleccionado_2 = valor;
    this.limpiarCampos();
  }

  @Output() tipoDiferidaChange = new EventEmitter<string>();

  onTipoDiferidaChange(nuevoValor: string) {
    this.valorSeleccionado_2 = nuevoValor;
    this.tipoDiferidaChange.emit(nuevoValor);
  }

  enviar(event: Event) {
    this.diferida = false;
    event.preventDefault();
    this.annuities_Form.get("tipo_anualidad")?.setValue(this.valorSeleccionado);
    if (this.annuities_Form.get("tasa_interes_efectiva")?.value == 0) {
      alert("Falta informacion respecto a la tasa interes efectiva");
    } else {
      this.resultado = this.annuitiesService.solution_anualidad(
        this.annuities_Form.value,
        this.diferida,
        this.valorSeleccionado_2
      );
    }
  }
}
