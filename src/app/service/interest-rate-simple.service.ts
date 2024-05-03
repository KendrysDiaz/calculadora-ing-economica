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

    console.log("presentValue: ", presentValue);
    console.log("finalValue: ", finalValue);
    console.log("interes: ", interes);
    console.log("timeAnual: ", timeAnual);
    console.log("timePeriodo: ", timePeriodo);

    //Valores de salida
    let resultPresentValue: number = 0;
    let resultFinalValue: number = 0;
    let resultInterestRateAnual: number = 0;
    let resultInterestRatePeriodo: number = 0;
    let resultInterest: number = 0;
    let resultadoInteresFinal: number;
    let resultadoTiempoFinal: any;

    if (finalValue != null && presentValue != null) {
      resultFinalValue = finalValue;
      resultPresentValue = presentValue;
      resultInterest = finalValue - presentValue;
      resultInterestRateAnual =
        ((finalValue / presentValue - 1) / timeAnual) * 100;
      if (timePeriodo > 0) {
        resultInterestRatePeriodo =
          ((finalValue / presentValue - 1) / timePeriodo) * 100;
      }
    }
    if (presentValue != null && interes != null) {
      resultFinalValue = interes + presentValue;
      resultPresentValue = presentValue;
      resultInterest = interes;
      resultInterestRateAnual = (interes / (presentValue * timeAnual)) * 100;
      if (timePeriodo > 0) {
        resultInterestRatePeriodo =
          (interes / (presentValue * timePeriodo)) * 100;
      }
    }

    if (finalValue != null && interes != null && presentValue === 0) {
      resultFinalValue = finalValue;
      resultPresentValue = finalValue - interes;
      resultInterest = interes;
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

    const Datos = {
      finalValue: resultFinalValue,
      presentValue: resultPresentValue,
      interesRateAnual: resultInterestRateAnual.toFixed(1),
      interesRatePeriodo: resultInterestRatePeriodo,
      interest: resultInterest,
      tiempo: {
        numero: parseFloat(resultadoTiempoFinal).toFixed(2),
        unidadDeTiempo: tipoDeTiempo,
      },
      resultInteres: {
        numero: resultadoInteresFinal.toFixed(2),
        unidadDeTiempo: tipoDeTiempo,
      },
    };

    console.log("Datos: ", Datos);
    return Datos;
  }
}
