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
    const time = interestRate.time;

    //Valores de salida
    let resultPresentValue: number = 0;
    let resultFinalValue: number = 0;
    let resultInterestRate: number = 0;
    let resultInterest: number = 0;

    switch (tipoRate) {
      case true:
        //simple
        if (finalValue != null && presentValue != null) {
          resultFinalValue = finalValue;
          resultPresentValue = presentValue;
          resultInterest = finalValue - presentValue;
          resultInterestRate = ((finalValue / presentValue - 1) / 5) * 100;
        }

        if (presentValue != null && interes != null) {
          resultFinalValue = interes + presentValue;
          resultPresentValue = presentValue;
          resultInterest = interes;
          resultInterestRate = (interes / (presentValue * 18)) * 100;
          console.log('formula 2');
        }
        break;

      case false:
        resultFinalValue = finalValue;
        resultPresentValue = presentValue;
        resultInterestRate =
          (Math.pow(finalValue / presentValue, 1 / 5) - 1) * 100;

        break;
      default:
        break;
    }

    const Datos = {
      finalValue: resultFinalValue,
      presentValue: resultPresentValue,
      interesRate: resultInterestRate,
      interest: resultInterest,
    };

    return Datos;
  }
}
