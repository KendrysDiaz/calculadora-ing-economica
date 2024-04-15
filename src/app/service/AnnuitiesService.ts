import { Injectable } from "@angular/core";
import { annuitiesInterface } from "../interface/annuities.interface";
import { AnnutiesVencidasFunctionsService } from "./annuties_functions/annuties-vencidas-functions.service";
import { AnnutiesAnticipadasFunctionsService } from "./annuties_functions/annuties-anticipadas-functions.service";
import { AnnutiesFunctionsDiferidasAnticipadaService } from "./annuties_functions/annuties-functions-diferidas-anticipada.service";
import { AnnutiesFunctionsDiferidasVencidasService } from "./annuties_functions/annuties-functions-diferidas-vencidas.service";


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
    private diferidas_anticipadas: AnnutiesFunctionsDiferidasAnticipadaService,
    private diferidas_vencidas: AnnutiesFunctionsDiferidasVencidasService
  ) { }

  solution_anualidad(
    info: annuitiesInterface,
    diferida: boolean,
    tipo_diferida: boolean
  ): any {
    let tipo = info.tipo_anualidad;
    let valor = [];

    if (diferida) {
      switch (tipo) {
        case "Anticipada":
          valor = this.anticipada(info);
          break;
        case "Vencida":
          valor = this.vencida(info);
          break;

        default:
          break;
      }
      return valor;
    } else {
      diferida(info, tipo_diferida);
    }
  }

  vencida(info: annuitiesInterface): any {
    if (info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta != 0 &&
      info.valor_presente == 0) {
      //listo
      return this.vencidas_services.busqueda_valores_futuro_presente(info);
    } else if (info.valor_final != 0 &&
      info.num_periodos == 0 &&
      info.renta != 0 &&
      info.valor_presente == 0) {
      //listo
      return this.vencidas_services.buscar_valor_numero_periodos(info);
    } else if (info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta == 0 &&
      info.valor_presente != 0) {
      //listo
      return this.vencidas_services.buscar_valor_renta(info);
    }
    return 0;
  }

  anticipada(info: annuitiesInterface): any {
    console.log("Entro", info);
    if (info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta != 0 &&
      info.valor_presente == 0) {
      //lista
      return this.anticipadas_services.busqueda_valores_futuro_presente(info);
    } else if (info.valor_final != 0 &&
      info.num_periodos == 0 &&
      info.renta != 0 &&
      info.valor_presente != 0) {
      return this.anticipadas_services.buscar_valor_numero_periodos(info);
    } else if (info.valor_final == 0 &&
      info.num_periodos != 0 &&
      info.renta == 0 &&
      info.valor_presente != 0) {
      //listo
      return this.anticipadas_services.buscar_valor_renta(info);
    }
    return 0;
  }

  diferida(info: annuitiesInterface, tipo_diferida: boolean) {
    //true para vencida
    if (info.valor_presente == 0 &&
      info.tasa_interes_efectiva != 0 &&
      info.num_periodos != 0 &&
      info.num_periodos_gracia != 0 &&
      info.renta != 0 &&
      info.valor_final == 0) {
      //buscamos el valor presente
      let Resultado: any;
      if (tipo_diferida) {
        return this.diferidas_anticipadas.busqueda_presente_anticipada(info);
      } else {
        return this.diferidas_vencidas.busqueda_presente_vencida(info);
      }
    } else if (info.valor_presente != 0 &&
      info.tasa_interes_efectiva != 0 &&
      info.num_periodos != 0 &&
      info.num_periodos_gracia != 0 &&
      info.renta == 0 &&
      info.valor_final == 0) {
      //buscamos el renta
      if (tipo_diferida) {
        return this.diferidas_anticipadas.busqueda_renta_anticipada(info);
      } else {
        return this.diferidas_vencidas.busqueda_renta_vencida(info);
      }
    } else if (info.valor_presente != 0 &&
      info.tasa_interes_efectiva != 0 &&
      info.num_periodos == 0 &&
      info.num_periodos_gracia != 0 &&
      info.renta != 0 &&
      info.valor_final == 0) {
      //buscamos el numero de periodos
      if (tipo_diferida) {
        return this.diferidas_anticipadas.busqueda_periodos_anticipada(info);
      } else {
        return this.diferidas_vencidas.busqueda_periodos_vencida(info);
      }
    } else if (info.valor_presente != 0 &&
      info.tasa_interes_efectiva != 0 &&
      info.num_periodos != 0 &&
      info.num_periodos_gracia == 0 &&
      info.renta != 0 &&
      info.valor_final == 0) {
      //buscamos el numero de periodos de gracia
      if (tipo_diferida) {
        return this.diferidas_anticipadas.busqueda_periodos_gracia_anticipada(
          info
        );
      } else {
        return this.diferidas_vencidas.busqueda_periodos_gracia_vencida(info);
      }
    }
    return "";
  }
}
