import { Injectable } from "@angular/core";
import { interestRateInterface } from "../interface/interestRate.interface";

@Injectable({
  providedIn: "root",
})
export class InterestRateSimpleService {
  constructor() {}

  calculatorInteresRateSimple(
    interestRate: interestRateInterface,
    tipoDeTiempo: any
  ) {
    //Valores Entrantes
    const presentValue = interestRate.presentValue;
    const finalValue = interestRate.finalValue;
    const interes = interestRate.interest;
    const timeAnual = interestRate.timeAnual;
    const timePeriodo = interestRate.timePeriodo;

    //Valores de salida
    let resultPresentValue: number = 0;
    let resultInterestRateAnual: number = 0;
    let resultInterestRatePeriodo: number = 0;
    let resultadoInteresFinal: number;
    let resultadoTiempoFinal: any;

    if (finalValue != null && presentValue != null) {
      resultInterestRateAnual =
        ((finalValue / presentValue - 1) / timeAnual) * 100;
      if (timePeriodo > 0) {
        resultInterestRatePeriodo =
          ((finalValue / presentValue - 1) / timePeriodo) * 100;
      }
    }
    if (presentValue != null && interes != null) {
      resultInterestRateAnual = (interes / (presentValue * timeAnual)) * 100;
      if (timePeriodo > 0) {
        resultInterestRatePeriodo =
          (interes / (presentValue * timePeriodo)) * 100;
      }
    }

    if (finalValue != null && interes != null && presentValue === 0) {
      resultPresentValue = finalValue - interes;
      resultInterestRateAnual =
        (interes / (resultPresentValue * timeAnual)) * 100;
      if (timePeriodo > 0) {
        resultInterestRatePeriodo =
          (interes / (resultPresentValue * timePeriodo)) * 100;
      }
    }

    resultadoTiempoFinal = timePeriodo > 0 ? timePeriodo : timeAnual;
    resultadoInteresFinal =
      resultInterestRatePeriodo != 0
        ? resultInterestRatePeriodo
        : resultInterestRateAnual;

    let mensaje: any;
    if (timePeriodo > 0) {
      mensaje = `La tasa de interes es de ${resultInterestRateAnual.toFixed(
        1
      )}% anual o ${resultInterestRatePeriodo.toFixed(1)}% ${tipoDeTiempo}`;
    } else {
      mensaje = `La tasa de interes es de ${resultInterestRateAnual.toFixed(
        1
      )}% anual `;
    }
    return mensaje;
  }
}
