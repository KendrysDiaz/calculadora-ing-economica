import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-check',
  standalone: true,
  imports: [],
  templateUrl: './time-check.component.html',
  styleUrl: './time-check.component.css',
})
export class TimeCheckComponent {
  years = Array.from({ length: 100 }, (_, i) => i + 1); // Años desde 1 al 100
  months = Array.from({ length: 12 }, (_, i) => i + 1); // Meses del 1 al 12
  weeks = Array.from({ length: 52 }, (_, i) => i + 1); // Semanas del 1 al 52
  days = Array.from({ length: 100 }, (_, i) => i + 1); // Días del 1 al 31
  periodos = [
    { nombre: 'Anual', equivalencia: '1 año' },
    { nombre: 'Semestre', equivalencia: '6 meses' },
    { nombre: 'Cuatrimestre', equivalencia: '4 meses' },
    { nombre: 'Trimestre', equivalencia: '3 meses' },
    { nombre: 'Bimestre', equivalencia: '2 meses' },
    { nombre: 'Mensual', equivalencia: '1 mes' },
    { nombre: 'Quincenal', equivalencia: '15 días' },
  ];
  year = 0;
  month: number = 0;
  week: number = 0;
  day: number = 0;
  dateInit: any;
  dateFinish: any;
  nPeriodos: number = 0;
  periodo: string = '';
  page: number = 0;
  time: number = 0;
  namePeriodo: any;
  @Input() tipoTasaSeleccionada?: any; //es para saber que tipo de tasa esta trabajando(Lo necesito para las fechas)
  @Input() tipoBotton?: any = ""; //para que no interfiera con lo de kendrys
  selectPeriodo: boolean = false;

  timeCalculator() {
    let month = Number(this.month);
    let year = Number(this.year);
    let day = Number(this.day);
    let week = Number(this.week);
    console.log('Tipo tasa seleccionada: ', this.tipoTasaSeleccionada);
    if (this.page === 1) {
      if (year > 0 && month === 0 && week === 0 && day === 0) {
        this.time = year;

        if (!this.tipoTasaSeleccionada && this.tipoBotton == 'TasaInteres') {
          this.time = year;
        }
      } else if (year === 0 && month > 0 && week === 0 && day === 0) {
        this.time = month / 12;

        if (!this.tipoTasaSeleccionada && this.tipoBotton == 'TasaInteres') {
          this.time = month;
        }
      } else if (year === 0 && month === 0 && week > 0 && day === 0) {
        this.time = week / 52;
        if (!this.tipoTasaSeleccionada && this.tipoBotton == 'TasaInteres') {
          this.time = week;
        }
      } else if (year === 0 && month === 0 && week === 0 && day > 0) {
        this.time = day / 360;
        if (!this.tipoTasaSeleccionada && this.tipoBotton == 'TasaInteres') {
          this.time = day;
        }
      } else if (year > 0 && month > 0 && week === 0 && day === 0) {
        this.time = year + month / 12;
      } else if (year > 0 && month === 0 && week > 0 && day === 0) {
        this.time = year + week / 52;
      } else if (year > 0 && month === 0 && week === 0 && day > 0) {
        this.time = year + day / 360;
      } else if (year === 0 && month > 0 && week > 0 && day === 0) {
        this.time = month / 12 + week / 52;
      } else if (year === 0 && month > 0 && week === 0 && day > 0) {
        this.time = month / 12 + day / 360;
      } else if (year === 0 && month === 0 && week > 0 && day > 0) {
        this.time = week / 52 + day / 360;
      } else if (year > 0 && month > 0 && week > 0 && day === 0) {
        this.time = year + month / 12 + week / 52;
      } else if (year > 0 && month > 0 && week === 0 && day > 0) {
        this.time = year + month / 12 + day / 360;
      } else if (year > 0 && month === 0 && week > 0 && day > 0) {
        this.time = year + week / 52 + day / 360;
      } else if (year === 0 && month > 0 && week > 0 && day > 0) {
        this.time = month / 12 + week / 52 + day / 360;
      } else if (year > 0 && month > 0 && week > 0 && day > 0) {
        this.time = year + month / 12 + week / 52 + day / 360;
      }
    } else if (this.page === 2) {
      let fecha1 = new Date(this.dateInit);
      let fecha2 = new Date(this.dateFinish);
      let diferenciaEnTiempo = Math.abs(fecha2.getTime() - fecha1.getTime());
      let diferenciaEnDias = Math.ceil(diferenciaEnTiempo / (1000 * 3600 * 24));
      this.time = diferenciaEnDias / 360;
    } else if (this.page === 3) {
      let equivalencia = '';
      for (const periodo of this.periodos) {
        if (periodo.nombre === this.periodo) {
          equivalencia = periodo.equivalencia;
        }
      }
      let [cantidad, unidad] = equivalencia.split(' ');
      let numero = Number(cantidad);
      if (unidad === 'meses') {
        this.time = this.nPeriodos * (numero / 12);
      } else if (unidad === 'dias') {
        this.time = this.nPeriodos * (numero / 360);
      } else {
        this.time = this.nPeriodos * numero;
      }
    }
  }

  onPeriodoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.namePeriodo = target.value;
    this.selectPeriodo = true;
  }
}
