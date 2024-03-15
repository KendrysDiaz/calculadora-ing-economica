import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  signal,
} from '@angular/core';
import { RadioButtonComponent } from '../../shared/radio-button/radio-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { InterestRatemessageComponent } from '../../shared/interest-ratemessage/interest-ratemessage.component';
import { TimeCheckComponent } from '../../shared/time-check/time-check.component';
import { ButtonTrashComponent } from '../../shared/button-trash/button-trash.component';
import { InterestRateCompuestoService } from '../../service/interest-rate-compuesto.service';
import { InterestRateSimpleService } from '../../service/interest-rate-simple.service';
import { Periodos } from '../../interface/PeriodoInterfaz.interface';

export interface infoInicial {
  titulo: string;
  url: string;
  informacion: string;
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
  @ViewChildren('selectElement')
  elementosSelect!: ElementRef<HTMLSelectElement>[];

  time: any;

  registrationForm: FormGroup;
  infofinalValue: number = 0;
  infopresentValue: number = 0;
  infoInteres: number = 0;
  infoTiempo: any;

  infoTasaFinal: {
    numero: number;
    unidadDeTiempo: string;
  } = {
    numero: 0,
    unidadDeTiempo: '',
  };

  tiempo: {
    numero: number;
    unidadDeTiempo: string;
  } = {
    numero: 0,
    unidadDeTiempo: '',
  };

  namePeriodoFinalParaTasaCompuesta: string = '';
  infoTasaPeriodo: string = '';
  infoTasaAnualCuandoEsPeriodo: number = 0;
  namePeriodo: string = '';
  namePeriodoDeCapitalizacion: string = '';
  result: any;
  isSelectedPeriodo: boolean = false;
  infoInicial: infoInicial[];
  infoSeleccionada: any = '';
  selectPeriodo: boolean = false;

  periodos: Periodos[] = [
    { nombre: 'Anual', equivalencia: '1 año' },
    { nombre: 'Semestre', equivalencia: '6 meses' },
    { nombre: 'Cuatrimestre', equivalencia: '4 meses' },
    { nombre: 'Trimestre', equivalencia: '3 meses' },
    { nombre: 'Bimestre', equivalencia: '2 meses' },
    { nombre: 'Mensual', equivalencia: '1 mes' },
    { nombre: 'Quincenal', equivalencia: '15 días' },
  ];

  public showContent = signal(false);

  constructor(
    private servicioSimple: InterestRateSimpleService,
    private servicioCompuesto: InterestRateCompuestoService
  ) {
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
        informacion:
          'es el porcentaje del capital inicial que se cobra como interés por un período de tiempo determinado',
      },
      {
        titulo: 'Tasa Interes Compuesto',
        url: '/FormulaTasaInteresCompuesto.png',
        informacion:
          'es un porcentaje que se aplica sobre el capital inicial de una inversión, más los intereses que se han acumulado en periodos anteriores.',
      },
    ];
    this.infoSeleccionada = this.infoInicial[1];
  }

  ejecutarFuncionHijo() {
    this.hijo.timeCalculator();
    this.time = this.hijo.time;
    this.registrationForm.get('timePeriodo')?.setValue(this.hijo.nPeriodos);
    this.registrationForm.get('timeAnual')?.setValue(this.hijo.time);
    this.namePeriodo = this.hijo.namePeriodo;
    if (this.namePeriodo != 'Periodo' && this.namePeriodo != undefined) {
      this.isSelectedPeriodo = true;
    }
  }

  calcular() {
    if (this.hijo.page == 0) {
      alert('Por favor, revise la informaciòn');
    } else {
      if (this.showContent() == true) {
        this.result = this.servicioSimple.calculatorInteresRateSimple(
          this.registrationForm.value,
          this.hijo.tipoDeTiempo
        );
        this.infoInteres = parseFloat(this.result.interest.toFixed(2));
        this.infofinalValue = this.result.finalValue;
        this.infopresentValue = this.result.presentValue;
        this.tiempo = this.result.tiempo;
        this.infoTasaFinal = this.result.resultInteres;
        if (this.namePeriodo != 'Periodo' && this.namePeriodo != undefined) {
          this.infoTasaAnualCuandoEsPeriodo = this.result.interesRateAnual;
        }

        this.vaciarCampos();
      }

      if (this.showContent() == false) {
        if (
          this.namePeriodoDeCapitalizacion != '' &&
          this.namePeriodoFinalParaTasaCompuesta != ''
        ) {
          this.result = this.servicioCompuesto.calcularInteresCompuesto(
            this.registrationForm.value,
            this.hijo.tipoDeTiempo,
            this.periodos.find(
              (e) => e.nombre == this.namePeriodoDeCapitalizacion
            ) as Periodos,
            this.periodos.find(
              (e) => e.nombre == this.namePeriodoFinalParaTasaCompuesta
            ) as Periodos
          );
          this.infoTasaFinal = this.result.resultInteres;
          this.infofinalValue = this.result.finalValue;
          this.infopresentValue = this.result.presentValue;
          this.tiempo = this.result.tiempo;
          this.vaciarCampos();
        } else {
          alert('Debe ingresar la capitalizacion y tasa final');
        }
      }
    }
  }

  onCapitalizacionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.namePeriodoDeCapitalizacion = target.value;
    this.selectPeriodo = true;
  }

  onTasaFinalChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.namePeriodoFinalParaTasaCompuesta = target.value;
    this.selectPeriodo = true;
  }

  vaciarCampos() {
    this.registrationForm.get('timePeriodo')?.setValue(null);
    this.registrationForm.get('finalValue')?.setValue(null);
    this.registrationForm.get('presentValue')?.setValue(null);
    this.registrationForm.get('timePeriodo')?.setValue(null);
    this.registrationForm.get('interest')?.setValue(null);
    this.registrationForm.get('timeAnual')?.setValue(null);
    this.namePeriodoDeCapitalizacion = '';
    this.namePeriodoFinalParaTasaCompuesta = '';
    this.hijo.year = 0;
    this.hijo.month = 0;
    this.hijo.week = 0;
    this.hijo.day = 0;
    this.hijo.periodo = '';
    this.camposRepetidosReBo();
  }

  camposRepetidosReBo() {
    this.hijo.page = 0;
    this.hijo.nPeriodos = 0;
    this.hijo.time = 0;
    this.selectPeriodo = false;
    this.reiniciarLosSelect();
  }

  reiniciarTitulos() {
    this.tiempo = { numero: 0, unidadDeTiempo: '' };
    this.infoTasaFinal = { numero: 0, unidadDeTiempo: '' };
    this.infofinalValue = 0;
    this.infopresentValue = 0;
    this.infoInteres = 0;
    this.infoTiempo = 0;
    this.infoTasaPeriodo = '';
    this.namePeriodo = '';
    this.infoTasaAnualCuandoEsPeriodo = 0;
    this.camposRepetidosReBo();
  }

  reiniciarLosSelect() {
    if (this.elementosSelect) {
      this.elementosSelect.forEach((select) => {
        select.nativeElement.selectedIndex = 0;
      });
    }
  }

  obtenerNombrePeriodo(periodo: string): string {
    switch (periodo) {
      case 'Anual':
        return 'Años';
      case 'Semestre':
        return 'Semestres';
      case 'Cuatrimestre':
        return 'Cuatrimestres';
      case 'Trimestre':
        return 'Trimestres';
      case 'Bimestre':
        return 'Bimestres';
      case 'Mensual':
        return 'Meses';
      case 'Quincenal':
        return 'Quincenas';
      default:
        return periodo;
    }
  }

  showContentRate() {
    this.showContent.update((value) => !value);
    this.reiniciarTitulos();
    this.reiniciarLosSelect();
    let index: number = this.showContent() ? 0 : 1;
    this.namePeriodoDeCapitalizacion = '';
    this.infoSeleccionada = this.infoInicial[index];
  }
}
