import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GradientService {
  constructor() {}

  private calculoGradientAritCre(datos: any): any {
    let A = datos.pcuota;
    let i = datos.i;
    let n = datos.n;
    let G = datos.gradiente;
    let vp = datos.vp;
    if (datos.option === 'VP') {
      let vp = A * ((1 - Math.pow(1 + i, -n)) / i) + (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n));
      return vp;
    } else if (datos.option === 'VF') {
      let vf = A * ((Math.pow(1 + i, n) - 1) / i) + (G / i) * ((Math.pow(1 + i, n) - 1) / i - n);
      return vf;
    } else if (datos.option === '1P') {
      let A = (vp - (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n))) / ((1 - Math.pow(1 + i, -n)) / i);
      return 'El valor de la primera cuota es: ' + A;
    } else if (datos.option === 'C') {
      let cuota = A + (n - 1) * G;
      return 'El valor de la cuota es: ' + cuota;
    }
  }

  private calculoGradientAritDec(datos: any): any {
    let A = datos.pcuota;
    let i = datos.i;
    let n = datos.n;
    let G = datos.gradiente;
    let vp = datos.vp;
    if (datos.option === 'VP') {
      let vp = A * ((1 - Math.pow(1 + i, -n)) / i) - (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n));
      return 'El valor presente es:' + vp;
    } else if (datos.option === 'VF') {
      let vf = A * ((Math.pow(1 + i, n) - 1) / i) - (G / i) * ((Math.pow(1 + i, n) - 1) / i - n);
      return 'El valor futuro es: ' + vf;
    } else if (datos.option === '1P') {
      let A = (vp + (G / i) * ((1 - Math.pow(1 + i, -n)) / i - n / Math.pow(1 + i, n))) / ((1 - Math.pow(1 + i, -n)) / i);
      return 'El valor de la primera cuota es: ' + A;
    } else if (datos.option === 'C') {
      let cuota = A - (n - 1) * G;
      return 'El valor de la cuota es: ' + cuota;
    }
  }

  private calculoGradientGeoCre(datos: any):any {
    let A = datos.pcuota;
    let i = datos.i;
    let n = datos.n;
    let G = datos.gradiente;
    let vp = datos.vp;
    if (datos.option === 'VP') {
      let vp = (A * (Math.pow(1 + G, n) * Math.pow(1 + i, -n) - 1)) / (G - i);
      return 'El valor presente es:' + vp;
    } else if(datos.option === 'VF'){
      let vf = (A * (Math.pow(1 + G, n) - Math.pow(1 + i, n))) / (G - i);
      return 'El valor futuro es: ' + vf;
    } else if (datos.option === '1P') {
      let A = (vp * (G - i)) / (Math.pow(1 + G, n) * Math.pow(1 + i, -n) - 1);
      return 'El valor de la primera cuota es: ' + A;
    } else if (datos.option === 'C') {
      let cuota = A*(Math.pow((1+G),n-1))
      return 'El valor de la cuota es: ' + cuota;
    }
  }

  private calculoGradientGeoDecre(datos: any): any {
      let A = datos.pcuota;
      let i = datos.i;
      let n = datos.n;
      let G = datos.gradiente;
      let vp = datos.vp;
      if (datos.option === 'VP') {
        let vp = (A * (Math.pow(1 - G, n) * Math.pow(1 + i, -n) - 1)) / (G + i);
        return 'El valor presente es:' + vp;
      } else if(datos.option === 'VF'){
        let vf = (A * (Math.pow(1 - G, n) - Math.pow(1 + i, n))) / (G + i);
        return 'El valor futuro es: ' + vf;
      } else if (datos.option === '1P') {
        let A = (vp * (G + i)) / (Math.pow(1 - G, n) * Math.pow(1 + i, -n) - 1);
        return 'El valor de la primera cuota es: ' + A;
      } else if (datos.option === 'C') {
        let cuota = A*(Math.pow((1-G),n-1))
        return 'El valor de la cuota es: ' + cuota;
      }
  }

  private time(){
    
  }
}
