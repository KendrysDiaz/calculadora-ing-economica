import { Injectable } from "@angular/core";
import { annuitiesInterface } from "../../interface/annuities.interface";
import { AnnutiesConvertionTimeFunctionsService } from "./annuties-convertion-time-functions.service";

@Injectable({
  providedIn: "root",
})
export class AnnutiesDiferidaFunctionsService {
  constructor(
    private convertion_time: AnnutiesConvertionTimeFunctionsService
  ) {}

  busqueda_valores_futuro_presente(info: annuitiesInterface): any {
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
    console.log("Entro a buscar el diferido ya");
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

    let vp =
      info.renta *
      ((1 - (1 + info.tasa_interes_efectiva) ** -tiempo) /
        info.tasa_interes_efectiva);

    let vp0 = vp / (1 + info.tasa_interes_efectiva) ** tiempo_gracia;

    let p1 =
      info.renta *
      (((1 + info.tasa_interes_efectiva) ** tiempo - 1) /
        (info.tasa_interes_efectiva *
          (1 + info.tasa_interes_efectiva) ** tiempo));

    let p = p1 / (1 + info.tasa_interes_efectiva) ** tiempo_gracia;
    console.log(vp0, ":", p);

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
      info.valor_presente *
      (1 + info.tasa_interes_efectiva) ** (tiempo + tiempo_gracia);

    let parte_2 =
      info.renta *
      (((1 + info.tasa_interes_efectiva) ** (-tiempo + tiempo_gracia) - 1) /
        info.tasa_interes_efectiva);
    let val = parte_1 + parte_2;

    /* forma 2 kendry  */

    let parte_3 =
      info.renta *
      (((1 + info.tasa_interes_efectiva) ** tiempo - 1) /
        info.tasa_interes_efectiva);

    let parte_4 = (1 + info.tasa_interes_efectiva) ** tiempo_gracia;

    let resultado = parte_3 * parte_4;
    console.log("Reultado  1:", val, " resultado 2: ", resultado);
    return resultado;
  }

  buscar_valor_renta(info: annuitiesInterface) {
    let n2 = 0;
    let n1 = 0;
    let val =
      (info.valor_presente * info.tasa_interes_efectiva) /
      ((1 + info.tasa_interes_efectiva) ** n2 *
        ((1 + info.tasa_interes_efectiva) ** n1 - 1));
    return val;
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
  }
}

/*
    /*seguna formula  */
