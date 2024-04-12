import { Injectable } from "@angular/core";
import { annuitiesInterface } from "../interface/annuities.interface";
import { AnnutiesVencidasFunctionsService } from "./annuties_functions/annuties-vencidas-functions.service";
import { AnnutiesAnticipadasFunctionsService } from "./annuties_functions/annuties-anticipadas-functions.service";
import { AnnutiesDiferidaFunctionsService } from "./annuties_functions/annuties-diferida-functions.service";

@Injectable({
  providedIn: "root",
})
export class AnnuitiesService {
  valor_final: number = 0;
  valor_presente: number = 0;
  renta: number = 0;
  num_periodos: number = 0;
  num_periodos_gracia: number = 0;
  tasa_interes_efectiva: number = 0;

  constructor(
    private vencidas_services: AnnutiesVencidasFunctionsService,
    private anticipadas_services: AnnutiesAnticipadasFunctionsService,
    private diferidas_services: AnnutiesDiferidaFunctionsService
  ) {}

  solution_anualidad(info: annuitiesInterface): any {
    let tipo = info.tipo_anualidad;
    let valor = [];
    console.log("llego...");
    switch (tipo) {
      case "Anticipada":
        valor = this.anticipada(info);
        break;
      case "Vencida":
        valor = this.vencida(info);
        break;
      case "Diferida":
        valor = this.diferida(info);
        break;

      default:
        break;
    }
    return valor;
  }

  vencida(info: annuitiesInterface): any {
    if (
      info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta != 0 &&
      info.valor_presente == 0
    ) {
      //listo
      return this.vencidas_services.busqueda_valores_futuro_presente(info);
    } else if (
      info.valor_final != 0 &&
      info.num_periodos == 0 &&
      info.renta != 0 &&
      info.valor_presente == 0
    ) {
      //listo
      return this.vencidas_services.buscar_valor_numero_periodos(info);
    } else if (
      info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta == 0 &&
      info.valor_presente != 0
    ) {
      //listo
      return this.vencidas_services.buscar_valor_renta(info);
    }
    return 0;
  }

  anticipada(info: annuitiesInterface): any {
    if (
      info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta != 0 &&
      info.valor_presente == 0
    ) {
      //lista
      return this.anticipadas_services.busqueda_valores_futuro_presente(info);
    } else if (
      info.valor_final != 0 &&
      info.num_periodos == 0 &&
      info.renta != 0 &&
      info.valor_presente != 0
    ) {
      return this.anticipadas_services.buscar_valor_numero_periodos(info);
    } else if (
      info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta == 0 &&
      info.valor_presente != 0
    ) {
      //listo
      return this.anticipadas_services.buscar_valor_renta(info);
    }
    return 0;
  }

  diferida(info: annuitiesInterface) {
    if (
      info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.num_periodos_gracia != 0 &&
      info.renta != 0 &&
      info.valor_presente == 0
    ) {
      //lista
      return this.diferidas_services.busqueda_valores_futuro_presente(info);
    } else if (
      info.valor_final != 0 &&
      info.num_periodos != 0 &&
      info.num_periodos_gracia != 0 &&
      info.renta == 0 &&
      info.valor_presente == 0
    ) {
      //segun el video de kendry se saca con el valor futuro
      return this.diferidas_services.buscar_valor_renta(info);
    }
  }
}
