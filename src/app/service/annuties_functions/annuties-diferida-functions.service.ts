import { Injectable } from "@angular/core";
import { annuitiesInterface } from "../../interface/annuities.interface";
import { AnnutiesConvertionTimeFunctionsService } from "./annuties-convertion-time-functions.service";

@Injectable({
  providedIn: "root",
})
export class AnnutiesDiferidaFunctionsService {
  constructor(
    private convertion_time: AnnutiesConvertionTimeFunctionsService
  ) {


    

  }
}

/*
    /*seguna formula  */

/*  busqueda_valores_futuro_presente(info: annuitiesInterface): any {
    let val_1 = this.buscar_valor_futuro(info);
    let val_2 = this.buscar_valor_presente(info);

    return (
      "Segun la informacion ingresada se tiene como resultado que el valor actual es de " +
      val_2.toFixed(2) +
      "mientras que el valor futuro es " +
      val_1.toFixed(2)
    );
  }

  buscar_valor_presente(info: annuitiesInterface): any {
    let tiempo = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let tiempo_gracia = this.convertion_time.conversion(
      info.num_periodos_gracia,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let p1 =
      info.renta *
      (((1 + info.tasa_interes_efectiva) ** tiempo - 1) /
        (info.tasa_interes_efectiva *
          (1 + info.tasa_interes_efectiva) ** tiempo));

    let p = p1 / (1 + info.tasa_interes_efectiva) ** tiempo_gracia;

    return p;
  }

  buscar_valor_futuro(info: annuitiesInterface): any {
    let tiempo = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let tiempo_gracia = this.convertion_time.conversion(
      info.num_periodos_gracia,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let parte_1 =
      info.renta *
      (((1 + info.tasa_interes_efectiva) ** tiempo - 1) /
        info.tasa_interes_efectiva);

    let parte_2 = (1 + info.tasa_interes_efectiva) ** tiempo_gracia;

    let resultado = parte_1 * parte_2;
    return resultado;
  }

  buscar_valor_renta(info: annuitiesInterface) {
    let tiempo = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let tiempo_gracia = this.convertion_time.conversion(
      info.num_periodos_gracia,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let renta =
      (info.valor_final * info.tasa_interes_efectiva) /
      ((1 + info.tasa_interes_efectiva) ** tiempo_gracia *
        ((1 + info.tasa_interes_efectiva) ** tiempo - 1));
    return (
      "Segun la informacion proporcionada el valor de renta o cuota es de: " +
      renta.toFixed(2)
    );
  }

  buscar_tiempo_diferido(info: annuitiesInterface): any {
    let val =
      Math.log(
        info.renta *
          ((1 - 1 / (1 + info.tasa_interes_efectiva) ** info.num_periodos) /
            (info.tasa_interes_efectiva / info.valor_presente))
      ) / Math.log(1 + info.tasa_interes_efectiva);
    return val;
  }

  buscar_valor_numero_periodos(info: annuitiesInterface): any {
    return 0;
  } */
