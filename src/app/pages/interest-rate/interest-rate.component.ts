import { InterestRateService } from './../../service/interest-rate.service';
import { Component, ViewChild, signal } from '@angular/core';
import { RadioButtonComponent } from '../../shared/radio-button/radio-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { InterestRatemessageComponent } from '../../shared/interest-ratemessage/interest-ratemessage.component';
import { TimeCheckComponent } from '../../shared/time-check/time-check.component';
import { ButtonTrashComponent } from '../../shared/button-trash/button-trash.component';

export interface infoInicial {
  titulo: string;
  url: string;
}
@Component({
  selector: 'app-interest-rate',
  standalone: true,
  templateUrl: './interest-rate.component.html',
  styleUrl: './interest-rate.component.css',
  imports: [
    RadioButtonComponent,
    ReactiveFormsModule,
    InputComponent,
    InterestRatemessageComponent,
    TimeCheckComponent,
    ButtonTrashComponent,
  ],
})
export default class InterestRateComponent {
  @ViewChild(TimeCheckComponent) hijo!: TimeCheckComponent;
  time: any;
  registrationForm: FormGroup;
  infofinalValue: number = 0;
  infopresentValue: number = 0;
  infoInteres: number = 0;
  infoTiempo: number = 0;
  infoTasaAnual: string = '';
  infoTasaPeriodo: string = '';
  namePeriodo: string = '';

  isSelectedPeriodo: boolean = false;

  infoInicial: infoInicial[];
  infoSeleccionada: infoInicial | null = null; // Variable para almacenar la información seleccionada

  public showContent = signal(false);

  constructor(private interesRateService: InterestRateService) {
    this.registrationForm = new FormGroup({
      finalValue: new FormControl(),
      presentValue: new FormControl(),
      interest: new FormControl(),
      timeAnual: new FormControl(),
      timePeriodo: new FormControl(),
    });

    this.infoInicial = [
      {
        titulo: 'Tasa Interes Simple',
        url: '/FormulaTasaInteresSimple.png',
      },
      {
        titulo: 'Tasa Interes Compuesto',
        url: '/FormulaTasaInteresCompuesto.png',
      },
    ];
    this.infoSeleccionada = this.infoInicial[1];
  }

  ejecutarFuncionHijo() {
    this.hijo.timeCalculator();
    this.time = this.hijo.time;
    this.registrationForm.get('timePeriodo')?.setValue(this.hijo.nPeriodos);
    this.registrationForm.get('timeAnual')?.setValue(this.hijo.time);
    console.log('Periodo', this.hijo.nPeriodos);
    console.log('Fecha', this.hijo.time);
    this.namePeriodo = this.hijo.namePeriodo;

    if (this.namePeriodo != 'Periodo' && this.namePeriodo != undefined) {
      this.isSelectedPeriodo = true;
    }
  }

  calcular() {
    if (this.hijo.page == 0) {
      alert('Por favor, rectifique la informaciòn');
    } else {
      let result;
      result = this.interesRateService.calculatorInteresRate(
        this.registrationForm.value,
        this.showContent()
      );
      this.infofinalValue = result.finalValue;
      this.infopresentValue = result.presentValue;
      this.infoTasaAnual = result.interesRateAnual.toFixed(2);
      this.infoInteres = result.interest;
      this.infoTasaPeriodo = result.interesRatePeriodo.toFixed(2);
      this.infoTiempo = this.time.toFixed(2);
      this.vaciarCampos();
    }
  }

  verificarCamposYTiempo() {
    const finalValue = this.registrationForm.get('finalValue')?.value;
    const presentValue = this.registrationForm.get('finalValue')?.value;
    const interest = this.registrationForm.get('finalValue')?.value;

    if (this.hijo.page == 0) {
      console.log(
        'Por favor, complete todos los campos y seleccione un tiempo.'
      );
    }
  }

  vaciarCampos() {
    this.registrationForm.get('timePeriodo')?.setValue('');
    this.registrationForm.get('finalValue')?.setValue('');
    this.registrationForm.get('presentValue')?.setValue('');
    this.registrationForm.get('timePeriodo')?.setValue('');
    this.registrationForm.get('interest')?.setValue('');
    this.registrationForm.get('timeAnual')?.setValue('');
    this.hijo.page = 0;
    this.hijo.time = 0;
    this.hijo.year = 0;
    this.hijo.month = 0;
    this.hijo.week = 0;
    this.hijo.day = 0;
    this.hijo.nPeriodos = 0;
    this.hijo.periodo = '';
    this.hijo.page = 0;
  }

  reiniciarTitulos() {
    this.infofinalValue = 0;
    this.infopresentValue = 0;
    this.infoInteres = 0;
    this.infoTiempo = 0;
    this.infoTasaAnual = '';
    this.infoTasaPeriodo = '';
    this.namePeriodo = '';
    this.hijo.page = 0;
    this.hijo.time = 0;
    this.hijo.nPeriodos = 0;
  }

  showContentRate() {
    this.showContent.update((value) => !value);
    let index: number = this.showContent() ? 0 : 1;
    this.reiniciarTitulos();
    this.infoSeleccionada = this.infoInicial[index];
  }
}
