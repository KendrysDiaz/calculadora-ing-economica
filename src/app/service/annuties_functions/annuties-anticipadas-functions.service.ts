import { Injectable } from "@angular/core";
import { annuitiesInterface } from "../../interface/annuities.interface";
import { AnnutiesConvertionTimeFunctionsService } from "./annuties-convertion-time-functions.service";

@Injectable({
  providedIn: "root",
})
export class AnnutiesAnticipadasFunctionsService {
  constructor(
    private convertion_time: AnnutiesConvertionTimeFunctionsService
  ) {}

  busqueda_valores_futuro_presente(info: annuitiesInterface): any {
    let val_1 = this.buscar_valor_futuro(info);
    let val_2 = this.buscar_valor_presente(info);

    return (
      "Segun la informacion ingresada se tiene como resultado que el valor actual es de " +
      val_2.toFixed(2) +
      " mientras que el valor futuro es " +
      val_1.toFixed(2)
    );
  }

  buscar_valor_futuro(info: annuitiesInterface): number {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    return (
      info.renta *
      (((1 + info.tasa_interes_efectiva) ** n - 1) /
        info.tasa_interes_efectiva) *
      (1 + info.tasa_interes_efectiva)
    );
  }

  buscar_valor_presente(info: annuitiesInterface): number {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    return (
      info.renta *
      ((1 - (1 + info.tasa_interes_efectiva) ** -n) /
        info.tasa_interes_efectiva) *
      (1 + info.tasa_interes_efectiva)
    );
  }

  buscar_valor_renta_con_valor_presente(info: annuitiesInterface) {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );
    let renta =
      (info.valor_presente * info.tasa_interes_efectiva) /
      ((1 + info.tasa_interes_efectiva) *
        (1 - (1 + info.tasa_interes_efectiva) ** -n));

    return (
      "Segun la informacion proporcionada el valor de renta el valor de renta (teniendo en cuenta el capital) " +
      renta.toFixed(2)
    );
  }

  buscar_valor_renta_con_valor_final(info: annuitiesInterface) {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let val_1 =
      ((1 + info.tasa_interes_efectiva) ** n - 1) / info.tasa_interes_efectiva;
    let val_2 = val_1 * (1 + info.tasa_interes_efectiva);

    let renta = info.valor_final / val_2;

    return (
      "Segun la informacion proporcionada el valor de renta (teniendo en cuenta el monto final): " +
      renta.toFixed(2)
    );
  }

  buscar_valor_numero_periodos_con_valor_final(info: annuitiesInterface): any {
    let val_1 =
      Math.log(
        (info.valor_final * info.tasa_interes_efectiva) /
          (info.renta * (1 + info.tasa_interes_efectiva)) +
          1
      ) / Math.log(1 + info.tasa_interes_efectiva);

    let val_2 = this.convertion_time.obtener_nombre(info.val_frecuencia_tasa);

    return (
      "Segun los datos suministrados el numero de periodos (teniendo en cuenta el monto)es de: " +
      val_1.toFixed(2) +
      " " +
      val_2
    );
  }

  buscar_valor_numero_periodos_con_valor_presente(
    info: annuitiesInterface
  ): any {
    let val_3 =
      1 -
      (info.valor_presente * info.tasa_interes_efectiva) / info.renta +
      info.tasa_interes_efectiva;

    let val_4 = 1 - Math.log(val_3) / Math.log(1 + info.tasa_interes_efectiva);
    let val_2 = this.convertion_time.obtener_nombre(info.val_frecuencia_tasa);

    return (
      "Segun los datos suministrados el numero de periodos (teniendo en cuenta el capital) es de: " +
      val_4.toFixed(2) +
      " " +
      val_2
    );
  }
}
