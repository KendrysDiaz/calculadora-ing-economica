import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-time-grad',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl:'./timeGrad.component.html',
  styleUrl: './timeGrad.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeGradComponent { 
  seleccion = '';
  time = 0;
  tasaI = 0;
  unidadC = "";
  unidadT = "";

  @Output() tasaInteres = new EventEmitter<number[]>();

  changeUnidad(event: Event, option: number){
    const target = event.target as HTMLSelectElement;
    if (option==1) {
      this.unidadC = target.value;
    }else if(option==2){
      this.unidadT=target.value
      this.calcularTasa()
    }else if(option==3){
      this.tasaI = Number(target.value)
    }else{
      this.time = Number(target.value)
    }
  }

  calcularTasa(){
    if (this.unidadC != this.unidadT) {
      // Mensual a otras unidades
      if (this.unidadC === 'mensual') {
        if (this.unidadT === 'bimensual') {
          this.tasaI = this.tasaI / 2;
        } else if (this.unidadT === 'trimestral') {
          this.tasaI = this.tasaI / 3;
        } else if (this.unidadT === 'anual') {
          this.tasaI = this.tasaI / 12;
        }
      }
      // Bimensual a otras unidades
      else if (this.unidadC === 'bimensual') {
        if (this.unidadT === 'mensual') {
          this.tasaI = this.tasaI * 2;
        } else if (this.unidadT === 'trimestral') {
          this.tasaI = this.tasaI - (this.tasaI/3);
        } else if (this.unidadT === 'anual') {
          this.tasaI = this.tasaI / 6;
        }
      }
      // Trimestral a otras unidades
      else if (this.unidadC === 'trimestral') {
        if (this.unidadT === 'mensual') {
          this.tasaI = this.tasaI * 3;
        } else if (this.unidadT === 'bimensual') {
          this.tasaI = this.tasaI + (this.tasaI/3);
        } else if (this.unidadT === 'anual') {
          this.tasaI = this.tasaI / 4;
        }
      }
      // Anual a otras unidades
      else if (this.unidadC === 'anual') {
        if (this.unidadT === 'mensual') {
          this.tasaI = this.tasaI * 12;
        } else if (this.unidadT === 'bimensual') {
          this.tasaI = this.tasaI * 6;
        } else if (this.unidadT === 'trimestral') {
          this.tasaI = this.tasaI * 4;
        }
      }
    }
    let datos = [this.tasaI, this.time]
    this.tasaInteres.emit(datos);
  }
  
}
