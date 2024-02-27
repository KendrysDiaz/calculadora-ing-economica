import { Injectable } from '@angular/core';
import { interestRateInterface } from '../interface/interestRate.interface';

@Injectable({
  providedIn: 'root',
})
export class InterestRateService {
  constructor() {}

  calculatorInteresRate(
    interestRate: interestRateInterface,
    tipoRate: boolean
  ) {
    //Valores Entrantes
    const presentValue = interestRate.presentValue;
    const finalValue = interestRate.finalValue;
    const interes = interestRate.interest;
    const timeAnual = interestRate.timeAnual;
    const timePeriodo = interestRate.timePeriodo;

    //Valores de salida
    let resultPresentValue: number = 0;
    let resultFinalValue: number = 0;
    let resultInterestRateAnual: number = 0;
    let resultInterestRatePeriodo: number = 0;
    let resultInterest: number = 0;

    switch (tipoRate) {
      case true:
        //simple
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
          console.log(interes, presentValue, timeAnual, timePeriodo);
          resultInterestRateAnual =
            (interes / (presentValue * timeAnual)) * 100;
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
        break;

      case false:
        resultFinalValue = finalValue;
        resultPresentValue = presentValue;
        resultInterestRateAnual =
          (Math.pow(finalValue / presentValue, 1 / timeAnual) - 1) * 100;
        if (timePeriodo > 0) {
          resultInterestRatePeriodo =
            (Math.pow(finalValue / presentValue, 1 / timePeriodo) - 1) * 100;
        }

        break;
      default:
        break;
    }

    const Datos = {
      finalValue: resultFinalValue,
      presentValue: resultPresentValue,
      interesRateAnual: resultInterestRateAnual,
      interesRatePeriodo: resultInterestRatePeriodo,
      interest: resultInterest,
    };

    return Datos;
  }
}
