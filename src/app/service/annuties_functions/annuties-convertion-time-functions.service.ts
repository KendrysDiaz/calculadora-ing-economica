import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AnnutiesConvertionTimeFunctionsService {
  periodos: any;
  periodos_normal: { nombre: string; equivalencia: number }[];

  constructor() {
    this.periodos = [
      { nombre: "Anual", equivalencia: 1 },
      { nombre: "Semestral", equivalencia: 2 },
      { nombre: "Cuatrimestral", equivalencia: 3 },
      { nombre: "Trimestral", equivalencia: 4 },
      { nombre: "Bimestral", equivalencia: 6 },
      { nombre: "Mensual", equivalencia: 12 },
      { nombre: "Dario", equivalencia: 360 },
    ];

    this.periodos_normal = [
      { nombre: "Años", equivalencia: 1 },
      { nombre: "Semestre", equivalencia: 2 },
      { nombre: "Cuatrimestre", equivalencia: 3 },
      { nombre: "Trimestre", equivalencia: 4 },
      { nombre: "Bimestre", equivalencia: 6 },
      { nombre: "Meses", equivalencia: 12 },
      { nombre: "Dias", equivalencia: 360 },
    ];
  }

  conversion(
    tiempo: number,
    frecuencia_tiempo: number,
    frecuencia_tasa: number
  ) {
    if (frecuencia_tasa === frecuencia_tiempo) {
      return tiempo;
    } else {
      const factor_equivalencia =
        this.periodos.find(
          (periodo: { equivalencia: number }) =>
            periodo.equivalencia === frecuencia_tasa
        ).equivalencia /
        this.periodos.find(
          (periodo: { equivalencia: number }) =>
            periodo.equivalencia === frecuencia_tiempo
        ).equivalencia;
      return tiempo * factor_equivalencia;
    }
  }

  obtener_nombre(equivalencia: number): string {
    const periodoEncontrado = this.periodos_normal.find(
      (periodo) => periodo.equivalencia === equivalencia
    );

    if (periodoEncontrado) {
      return periodoEncontrado.nombre;
    }
    return "";
  }
}
