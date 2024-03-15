import { Injectable } from '@angular/core';
import { Periodo } from '../interface/Periodo';

@Injectable({
  providedIn: 'root'
})
export class InteresCompuestoServiceService {

  constructor() { }


  private gatValuePeriodoMeses(periodo: Periodo, tip: string): number {
    switch (periodo.periodo) {
      case 'dias':
        return (tip == 'meses') ? periodo.valor / 30 : periodo.valor / 360;
        break;
      case 'meses':
        return (tip == 'meses') ? periodo.valor : periodo.valor / 12
        break;
      case 'anos':
        return (tip == 'meses') ? periodo.valor * 12 : periodo.valor;
        break;
      default:
        return 0;
        break;
    }
  }


  private validProperty(ineteres: any): string[] {
    const objeto: { [key: string]: any } = ineteres
    const propiedadesVacias: string[] = [];
    for (const propiedad in objeto) {
      if (objeto.hasOwnProperty(propiedad)) {
        const valor = objeto[propiedad];
        if (valor === '' || valor === null || (Array.isArray(valor) && valor.length === 0)) {
          propiedadesVacias.push(propiedad);
        }
      }
    }
    return propiedadesVacias;
  }

  calularInteresCompuesto(interes: any): string {
    let campoVacio = this.validProperty(interes);
    let message = 'Todos los campos estan llenos';
    if (campoVacio.length === 1) {
      switch (campoVacio[0]) {
        case 'capital':
          message = this.CalcularCapital(interes);
          break;
        case 'periodos':
          message = this.CalcularPeriodo(interes);
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

  private calcularMonto(interes:any):string {
    let sum = this.getPeriodoSum(interes.periodos, 'meses');
    let base = (1 + interes.tasaInteres / 100);
    let reult = Math.pow(base, sum);
    const mc = (interes.capital * reult);
    return `El monto compuesto durante ${sum} meses es  $${Math.round(mc)} mensual`;
  }
  private calcularTasaInteres(interes: any):string {
    let sum = this.getPeriodoSum(interes.periodos, 'meses');
    let base = (interes.monto / interes.capital);
    let exponente = (1 / sum);
    const T = Math.pow(base, exponente) - 1;
    return  `La tasa de interes de para el monto de $${interes.monto} es de ${T.toFixed(3)} meses.`;
     
  }

  private CalcularPeriodo(interes: any) {
    const N = (Math.log10(interes.monto) - Math.log10(interes.capital)) / Math.log10(1 + interes.tasaInteres / 100);
    return `El tiempo requerido para alcanzar un monto de $${interes.monto} es de ${Math.round(N)} meses.`;
  }

  private CalcularCapital(interes: any): string {
    let suma = this.getPeriodoSum(interes.periodos, '');
    let base_ = (1 + (interes.tasaInteres / 100));
    let result = Math.pow(base_, suma);
    const c = interes.monto / result;
    return `Su capital inicial es de $${Math.round(c)}.`;
  }
  private getPeriodoSum(periodos: any[], periodo: string) {
    let sumPeriodos = 0;
    periodos.map((m: Periodo) => { sumPeriodos += this.gatValuePeriodoMeses(m, periodo); })
    return sumPeriodos;
  }



}
