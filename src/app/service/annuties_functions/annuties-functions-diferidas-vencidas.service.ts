import { Injectable } from "@angular/core";
import { annuitiesInterface } from "../../interface/annuities.interface";
import { AnnutiesConvertionTimeFunctionsService } from "./annuties-convertion-time-functions.service";

@Injectable({
  providedIn: "root",
})
export class AnnutiesFunctionsDiferidasVencidasService {
  constructor(
    private convertion_time: AnnutiesConvertionTimeFunctionsService
  ) {}

  busqueda_presente_vencida(info: annuitiesInterface) {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let y = this.convertion_time.conversion(
      info.num_periodos_gracia,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let val_1 = 1 - (1 + info.tasa_interes_efectiva) ** -n;
    let val_2 =
      (1 + info.tasa_interes_efectiva) ** y * info.tasa_interes_efectiva;

    return (
      "Segun la informacion proporcionada el valor presente es de: " +
      (info.renta * (val_1 / val_2)).toFixed(2)
    );
  }

  busqueda_renta_vencida(info: annuitiesInterface) {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let y = this.convertion_time.conversion(
      info.num_periodos_gracia,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let val_1 = info.valor_presente * info.tasa_interes_efectiva;
    let val_2 = 1 - (1 + info.tasa_interes_efectiva) ** -n;
    let val_3 = (1 + info.tasa_interes_efectiva) ** y;

    return (
      "Segun la informacion proporcionada la renta o cuota de anualidad es de: " +
      ((val_1 / val_2) * val_3).toFixed(2)
    );
  }

  busqueda_periodos_vencida(info: annuitiesInterface) {
    let y = this.convertion_time.conversion(
      info.num_periodos_gracia,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let val_1 =
      info.renta -
      info.valor_presente *
        ((1 + info.tasa_interes_efectiva) ** y * info.tasa_interes_efectiva);

    return (
      "Segun la informacion proporcionada el numero de periodos es: " +
      (
        (Math.log(info.renta) - Math.log(val_1)) /
        Math.log(1 + info.tasa_interes_efectiva)
      ).toFixed(2)
    );
  }

  busqueda_periodos_gracia_vencida(info: annuitiesInterface) {
    let n = this.convertion_time.conversion(
      info.num_periodos,
      info.val_frecuencia_tiempo,
      info.val_frecuencia_tasa
    );

    let val_1 = Math.log(1 - (1 + info.tasa_interes_efectiva) ** -n);
    let val_2 =
      Math.log(info.renta) +
      val_1 -
      Math.log(info.valor_presente * info.tasa_interes_efectiva);
    let val_3 = val_2 / Math.log(1 + info.tasa_interes_efectiva);

    return (
      "Segun la informacion proporcionada el numero de periodos de gracia es: " +
      val_3.toFixed(2)
    );
  }
}
