  import { Component } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'app-compound-interest',
    standalone: true,
    templateUrl: './compound-interest.component.html',
    styleUrls: ['./compound-interest.component.css'],
  })
  export default class CompoundInterestComponent {
    formGroup: FormGroup;
    resultadoCalculo: string = '';
    

    constructor(private formBuilder: FormBuilder) {
      this.formGroup = new FormGroup({
        calculo: new FormControl(),
        capital: new FormControl(0),
        tasaInteres:new FormControl(0),
        periodo: new FormControl(0),
        tiempo: new FormControl(0),
        monto: new FormControl(0),
      }); 
    }
    calcularInteres() {
      console.log(this.formGroup.value);
      if (true) {
        this.resultadoCalculo = this.calular(this.formGroup?.value);
      } else {
        this.resultadoCalculo = 'Por favor, completa todos los campos.';
      }
    }

  

    getValuePeriodoMeses(periodo: any, tip: string): number {
      switch (periodo) {
        case 'dias':
          return (tip == 'meses') ? 30 : 360;
        case 'meses':
          return (tip == 'meses') ? 1 : 12;
        case 'anos':
          return (tip == 'meses') ? 12 : 1;
        default:
          return 0;
      }
    }
    calular(interes: any): string {
      let op = interes;
      let message = 'seleccione que desea calcular';
      if (op != "Seleccionar") {
        switch (op) {
          case 'capital':
            message = this.calcularCapital(interes);
            break;
          case 'periodos':
            message = this.calcularPeriodo(interes);
            break
          case 'tasaInteres':
            message = this.calcularTasaInteres(interes);
            break
          case 'monto': 
            debugger
            message = this.calcularMonto(interes);
            break
          default:
            break;
        }
      }
      return message;
    }

    private validProperty(interest: any): string[] {
      const object: { [key: string]: any } = interest;
      const emptyProperties: string[] = [];

      for (const property in object) {
        if (object.hasOwnProperty(property)) {
          const value = object[property];
          if (value === '' || value === null || (Array.isArray(value) && value.length === 0)) {
            emptyProperties.push(property);
          }
        }
      }
      return emptyProperties;
    }


    private calcularMonto(interest: any): string {
      const sum = this.getPeriodoSum(interest.tiempo, 'meses');
      const base = 1 + interest.tasaInteres / 100;
      const result = Math.pow(base, sum);
      const compoundAmount = interest.capital * result;
      return `El monto compuesto durante ${sum} meses es  $${Math.round(compoundAmount)} mensual`;
    }

    private calcularTasaInteres(interest: any): string {
      const sum = this.getPeriodoSum(interest.tiempo, 'meses');
      const base = interest.monto / interest.capital;
      const exponente = 1 / sum;
      const Tasa = Math.pow(base, exponente) - 1;
      return `La tasa de interés para el monto de $${interest.monto} es de ${Tasa.toFixed(3)} meses.`;
    }

    private calcularPeriodo(interest: any): string {
      const N = (Math.log10(interest.monto) - Math.log10(interest.capital)) / Math.log10(1 + interest.tasaInteres / 100);
      return `El tiempo requerido para alcanzar un monto de $${interest.monto} es de ${Math.round(N)} meses.`;
    }

    private calcularCapital(interest: any): string {
      const suma = this.getPeriodoSum(interest.tiempo, '');
      const base = 1 + (interest.tasaInteres / 100);
      const result = Math.pow(base, suma);
      const capital = interest.monto / result;
      return `Su capital inicial es de $${Math.round(capital)}.`;
    }

    private getPeriodoSum(tiempo: number, periodo: string): number {
      return tiempo * this.getValuePeriodoMeses(periodo, 'meses');
    }
  }
