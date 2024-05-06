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
    let message = 'faltan campos por llenar o todos los campos estan llenos, recuerde dejar uno vacio para poder calcular dicho campo';
    if (campoVacio.length === 1) {
      switch (campoVacio[0]) {
        case 'capital':
          message = this.CalcularCapital(interes);
          break;
        case 'periodos':
          message = this.calcularPeriodo(interes);
          break
        case 'tasaInteres':
          message = this.calcularTasaInteres(interes);
          break
        case 'monto': 
          message = this.calcularMonto(interes);
          break
        default:
          break;
      }
    }
    return message;
  }

  private calcularMonto(interes:any):string {

    let capital= interes.capital;//c
    let tasaInteres = interes.tasaInteres;//i
    let periodos = this.getPeriodoSum(interes.periodos, 'meses');//n
    let capitalizacion= 1;//
      // elegir capitalizacion
    switch (interes.capitalizacion) {
      case 'anual':
          capitalizacion = 1;
          break;
      case 'semestral':
          capitalizacion = 2;
          periodos = periodos/6;
          break;
      case 'trimestral':
          capitalizacion = 4;
          periodos = periodos/3;
          break;
      case 'mensual':
          capitalizacion = 12;
          break;
      case 'bimestral': 
          capitalizacion = 6;
          periodos = periodos/2;
          break;
      // Agrega otros casos según sea necesario
  }
  console.log(capitalizacion);
    let base = (1 + (tasaInteres/ 100)/capitalizacion);
    let reult = Math.pow(base, periodos);
    const mc = (capital * reult);
    return `El monto compuesto es  $${Math.round(mc)}`;
  }

  private calcularTasaInteres(interes: any):string {

    let periodos = this.getPeriodoSum(interes.periodos, 'meses');//n
    let capitalizacion= 1;//
      // elegir capitalizacion
    switch (interes.capitalizacion) {
      case 'anual':
          capitalizacion = 1;
          break;
      case 'semestral':
          capitalizacion = 2;
          periodos = periodos/6;
          break;
      case 'trimestral':
          capitalizacion = 4;
          periodos = periodos/3;
          break;
      case 'mensual':
          capitalizacion = 12;
          break;
      case 'bimestral': 
          capitalizacion = 6;
          periodos = periodos/2;
          break;
      // Agrega otros casos según sea necesario
  }
    let base = (interes.monto / interes.capital/capitalizacion);
    let exponente = (1 / periodos);
    const T = Math.pow(base, exponente) - 1;
    return  `La tasa de interes de para el monto de $${interes.monto} es de ${T.toFixed(3)}`;
     
  }

  private calcularPeriodo(interes: any): string {
    let capital = interes.capital;
    let monto = interes.monto;
    let tasaInteres = interes.tasaInteres;
    let capitalizacion = 1;
    let tiempo
    // Elegir capitalización
    switch (interes.capitalizacion) {
      
      case 'anual':
        capitalizacion = 12; // 1 año = 12 meses
        tiempo = "años"
        break;
      case 'semestral':
        capitalizacion = 6; // 1 semestre = 6 meses
        tiempo = "semestres"
        break;
      case 'trimestral':
        capitalizacion = 3; // 1 trimestre = 3 meses
        tiempo = "trimestres"
        break;
      case 'mensual':
        capitalizacion = 1; // Meses (ya están en meses)
        tiempo = "meses"
        break;
        case 'bimestral':
          capitalizacion = 2; // Meses (ya están en meses)
          tiempo = "bimestres"
          break;
      default:
        capitalizacion = 1; // Meses (ya están en meses)

    }
  
    // Calcular el tiempo en meses
    const tiempoMeses = (Math.log(monto / capital) / Math.log(1 + tasaInteres / 100 / capitalizacion)) * (12 / capitalizacion);
    
    // Convertir el tiempo de meses a la unidad de capitalización seleccionada
    let tiempoCapitalizacion = tiempoMeses / capitalizacion;
  
    return `El tiempo requerido para alcanzar un monto de $${monto}es de aproximadamente ${Math.round(tiempoCapitalizacion)} ${tiempo}.`;
  }
  

  private CalcularCapital(interes: any): string {
    let periodo = this.getPeriodoSum(interes.periodos, 'meses');
    let capitalizacion = 1
    switch (interes.capitalizacion) {
      case 'anual':
          capitalizacion = 1;
      
          break;
      case 'semestral':
          capitalizacion = 2;
          periodo = periodo/6;

          break;
      case 'trimestral':
          capitalizacion = 4;
          periodo = periodo/3;
          break;
      case 'mensual':
          capitalizacion = 12;
          
          break;
      // Agrega otros casos según sea necesario
  }
  console.log(capitalizacion);

    let base_ = (1 + (interes.tasaInteres / 100/capitalizacion));
    let result = Math.pow(base_, periodo);
    const c = interes.monto / result;
    return `Su capital inicial es de $${Math.round(c)}.`;
  }
  private getPeriodoSum(periodos: any[], periodo: string) {
    let sumPeriodos = 0;
    periodos.map((m: Periodo) => { sumPeriodos += this.gatValuePeriodoMeses(m, periodo); })
    return sumPeriodos;
  }



}
