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

  buscar_valor_renta(info: annuitiesInterface) {
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
      "Segun la informacion proporcionada el valor de renta o cuota es de: " +
      renta.toFixed(2)
    );
  }

  buscar_valor_numero_periodos(info: annuitiesInterface): any {
    let val_1 =
      Math.log(
        (info.valor_final * info.tasa_interes_efectiva) /
          (info.renta * (1 + info.tasa_interes_efectiva)) +
          1
      ) / Math.log(1 + info.tasa_interes_efectiva);

    let val_2 = this.convertion_time.obtener_nombre(info.val_frecuencia_tasa);

    return (
      "Segun los datos suministrados el numero de periodos es de: " +
      val_1.toFixed(2) +
      " " +
      val_2
    );
  }
}
