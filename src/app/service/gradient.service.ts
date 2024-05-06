import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GradientService {
  constructor() {}

  calculoGradientAritCre(
    option: string,
    VP: number,
    pcuota: number,
    Ti: number,
    N: number,
    gradiente: number,
    cuotaI: number
  ): any {
    let A = pcuota;
    let i = Ti;
    let n = N;
    let G = gradiente;
    let vp = VP;

    if (option === "VP") {
      let vp = A * ((1 - Math.pow(1 + i, -n)) / i) + (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n));
      if (cuotaI > 0) {
        vp = vp + cuotaI;
      }
      return "El valor presente es: " + vp;
    } else if (option === "VF") {
      let vf = A * ((Math.pow(1 + i, n) - 1) / i) + (G / i) * ((Math.pow(1 + i, n) - 1) / i - n);
      if (cuotaI > 0) {
        vf = vf + cuotaI;
      }
      return "El valor futuro es: " + vf;
    } else if (option === "1P") {
      let A = (vp - (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n))) / ((1 - Math.pow(1 + i, -n)) / i);
      A = Math.abs(A);
      return "El valor de la primera cuota es: " + A;
    } else if (option === "C") {
      let cuota = A + (n - 1) * G;
      return "El valor de la cuota es: " + parseFloat(cuota.toFixed(2));
    }
  }

  calculoGradientAritDec(
    option: string,
    VP: number,
    pcuota: number,
    Ti: number,
    N: number,
    gradiente: number,
    cuotaI: number
  ): any {
    let A = pcuota;
    let i = Ti;
    let n = N;
    let G = gradiente;
    let vp = VP;
    if (option === "VP") {
      let vp =
        A * ((1 - Math.pow(1 + i, -n)) / i) -
        (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n));
      if (cuotaI > 0) {
        vp = vp + cuotaI;
      }
      return "El valor presente es:" + parseFloat(vp.toFixed(2));
    } else if (option === "VF") {
      let vf =
        A * ((Math.pow(1 + i, n) - 1) / i) -
        (G / i) * (((Math.pow(1 + i, n) - 1) / i) - n);
      if (cuotaI > 0) {
        vf = vf + cuotaI;
      }
      return "El valor futuro es: " + vf;
    } else if (option === "1P") {
      let A =
        (vp +
          (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n))) /
        ((1 - Math.pow(1 + i, -n)) / i);
      return "El valor de la primera cuota es: " + A;
    } else if (option === "C") {
      let cuota = A - (n - 1) * G;
      return "El valor de la cuota es: " + cuota;
    }
  }

  calculoGradientGeoCre(
    option: string,
    VP: number,
    pcuota: number,
    Ti: number,
    N: number,
    gradiente: number,
    cuotaI: number
  ): any {
    let A = pcuota;
    let i = Ti;
    let n = N;
    let G = gradiente;
    let vp = VP;
    if (option === "VP") {
      let vp = (A * (Math.pow(1 + G, n) * Math.pow(1 + i, -n) - 1)) / (G - i);
      if (cuotaI > 0) {
        vp = vp + cuotaI;
      }
      return "El valor presente es:" + vp;
    } else if (option === "VF") {
      let vf = (A * (Math.pow(1 + G, n) - Math.pow(1 + i, n))) / (G - i);
      if (cuotaI > 0) {
        vf = vf + cuotaI;
      }
      return "El valor futuro es: " + vf;
    } else if (option === "1P") {
      let A = (vp * (G - i)) / (Math.pow(1 + G, n) * Math.pow(1 + i, -n) - 1);
      return "El valor de la primera cuota es: " + A;
    } else if (option === "C") {
      let cuota = A * Math.pow(1 + G, n - 1);
      return "El valor de la cuota es: " + cuota;
    }
  }

  calculoGradientGeoDec(
    option: string,
    VP: number,
    pcuota: number,
    Ti: number,
    N: number,
    gradiente: number,
    cuotaI: number
  ): any {
    let A = pcuota;
    let i = Ti;
    let n = N;
    let G = gradiente;
    let vp = VP;
    if (option === "VP") {
      let vp = (A * (1 - Math.pow(1 - G, n) * Math.pow(1 + i, -n))) / (G + i);
      if (cuotaI > 0) {
        vp = vp + cuotaI;
      }
      return "El valor presente es:" + vp;
    } else if (option === "VF") {
      let vf = (A * (Math.pow(1 + i , n) - Math.pow(1 - G, n))) / (G + i);
      if (cuotaI > 0) {
        vf = vf + cuotaI;
      }
      return "El valor futuro es: " + vf;
    } else if (option === "1P") {
      let A = (vp * (G + i)) / (Math.pow(1 - G, n) * Math.pow(1 + i, -n) - 1);
      return "El valor de la primera cuota es: " + A;
    } else if (option === "C") {
      let cuota = A * Math.pow(1 - G, n - 1);
      return "El valor de la cuota es: " + cuota;
    }
  }
}
