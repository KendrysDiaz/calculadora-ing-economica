import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeGradComponent } from '../../shared/time-grad/timeGrad.component';
import { GradientService } from '../../service/gradient.service';

@Component({
  selector: 'app-gradient',
  standalone: true,
  imports: [ReactiveFormsModule, TimeGradComponent],
  templateUrl: './gradient.component.html',
  styleUrl: 'gradient.component.css'
})
export default class GradientComponent {
  seleccion = ''; //
  tasaI = 0; //
  time = 0; //
  valorP = 0; //
  A = 0;
  G = 0;
  result = ''; //
  tipo = "";
  cuotaI = 0;
  resultado = 0;
  anticipado = false;
  creciente = false;
  decreciente = false;
  vencido = false;

  changeGradient(value: string) {
    this.seleccion = value;
  }
  cambioTasaI(datos: number[]) {
    this.tasaI = datos[0];
    this.time = datos[1];
  }
  changeResult(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.result = target.value;
  }
  changeInput(event: Event, option: number) {
    const target = event.target as HTMLSelectElement;
    switch (option) {
      case 1:
        this.valorP = Number(target.value);
        break;
      case 2:
        this.A = Number(target.value);
        break;
      case 3:
        this.G = Number(target.value);
        break;
      case 4:
        this.tipo = target.value
        break;
      case 5:
        this.cuotaI = Number(target.value)
    }
  }
  onSubmit(){
    if (this.seleccion === 'arit') {
      if (this.tipo === 'crec') {
        this.resultado = this.funciones.calculoGradientAritCre(this.result, this.valorP, this.A, this.tasaI, this.time, this.G, this.cuotaI)
      } else {
        this.resultado = this.funciones.calculoGradientAritDec(this.result, this.valorP, this.A, this.tasaI, this.time, this.G, this.cuotaI)
      } 
    } else {
      if (this.tipo === 'crec') {
        this.resultado = this.funciones.calculoGradientGeoCre(this.result, this.valorP, this.A, this.tasaI, this.time, this.G,this.cuotaI)
      } else {
        this.resultado = this.funciones.calculoGradientGeoDec(this.result, this.valorP, this.A, this.tasaI, this.time, this.G,this.cuotaI)
      } 
    }
  }
  clear(){
    location.reload()
  }
  constructor(private funciones: GradientService){

  }
}
