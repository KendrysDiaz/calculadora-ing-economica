import { Injectable } from "@angular/core";
import { interestRateInterface } from "../interface/interestRate.interface";
import { Periodos } from "../interface/PeriodoInterfaz.interface";

@Injectable({
  providedIn: "root",
})
export class InterestRateCompuestoService {
  constructor() {}

  calcularInteresCompuesto(
    interestRate: interestRateInterface,
    tipoDeTiempo: any,
    capitalizacion: Periodos,
    tipoDePeriodoTasaFinal: Periodos
  ) {
    const presentValue = interestRate.presentValue;
    const finalValue = interestRate.finalValue;
    const timeAnual = interestRate.timeAnual;
    const timePeriodo = interestRate.timePeriodo;

    let tiempo = timePeriodo != 0 ? timePeriodo : timeAnual;

    let tiempoConvertido = this.convertirTiempo(
      tiempo,
      tipoDeTiempo,
      capitalizacion
    );

    let tasaInteresSinConvertir =
      (Math.pow(finalValue / presentValue, 1 / tiempoConvertido.valor) - 1) *
      100;

    let tasaInteresMeses = this.convertirFechas(
      tasaInteresSinConvertir,
      tiempoConvertido.unidad,
      false
    );

    let tasaInteresDestino = this.convertirFechas(
      tasaInteresMeses,
      tipoDePeriodoTasaFinal.nombre,
      true
    );

    return `La tasa de interes es de ${tasaInteresDestino.toFixed(2)}% (${
      tipoDePeriodoTasaFinal.nombre
    })`;
  }

  convertirTiempo(valor: any, tipoTiempoOrigen: any, periodoDestino: any) {
    const equivalenciaOrigen = this.obtenerEquivalencia(tipoTiempoOrigen);
    if (!equivalenciaOrigen) {
      throw new Error(
        `Tipo de tiempo de origen no válido: ${tipoTiempoOrigen}`
      );
    }
    const equivalenciaDestino = this.obtenerEquivalencia(periodoDestino.nombre);
    if (!equivalenciaDestino) {
      throw new Error(
        `Tipo de tiempo de destino no válido: ${periodoDestino.nombre}`
      );
    }
    return {
      valor: (valor * equivalenciaOrigen) / equivalenciaDestino,
      unidad: periodoDestino.nombre,
    };
  }

  obtenerEquivalencia(tipoTiempo: any) {
    const periodos = [
      { nombre: "Anual", equivalencia: 12 }, // 1 año = 12 meses
      { nombre: "Semestre", equivalencia: 6 }, // 1 semestre = 6 meses
      { nombre: "Cuatrimestre", equivalencia: 4 }, // 1 cuatrimestre = 4 meses
      { nombre: "Trimestre", equivalencia: 3 }, // 1 trimestre = 3 meses
      { nombre: "Bimestre", equivalencia: 2 }, // 1 bimestre = 2 meses
      { nombre: "Mensual", equivalencia: 1 }, // 1 mes = 1 mes
      { nombre: "Quincenal", equivalencia: 0.5 }, // 1 quincena = 0.5 meses
    ];
    const periodoEncontrado = periodos.find(
      (periodo) => periodo.nombre === tipoTiempo
    );
    return !periodoEncontrado ? null : periodoEncontrado.equivalencia;
  }

  convertirFechas(val: number, unidad: string, tipo: boolean): number {
    const periodos = [
      { nombre: "Anual", equivalencia: 12 }, // 1 año = 12 meses
      { nombre: "Semestre", equivalencia: 6 }, // 1 semestre = 6 meses
      { nombre: "Cuatrimestre", equivalencia: 4 }, // 1 cuatrimestre = 4 meses
      { nombre: "Trimestre", equivalencia: 3 }, // 1 trimestre = 3 meses
      { nombre: "Bimestre", equivalencia: 2 }, // 1 bimestre = 2 meses
      { nombre: "Mensual", equivalencia: 1 }, // 1 mes = 1 mes
      { nombre: "Quincenal", equivalencia: 0.5 }, // 1 quincena = 0.5 meses
    ];
    const periodo = periodos.find((p) => p.nombre === unidad);
    if (!periodo) {
      throw new Error(`Unidad de origen no válida: ${unidad}`);
    }
    const equivalenciaEnMeses = periodo.equivalencia;
    return tipo ? val * equivalenciaEnMeses : val * (1 / equivalenciaEnMeses);
  }
}
