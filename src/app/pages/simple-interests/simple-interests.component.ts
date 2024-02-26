import { Component, ViewChild } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { TimeCheckComponent } from '../../shared/time-check/time-check.component';

@Component({
  selector: 'app-simple-interests',
  standalone: true,
  imports: [InputComponent, TimeCheckComponent],
  templateUrl: './simple-interests.component.html',
  styleUrl: './simple-interests.component.css',
})
export default class SimpleInterestsComponent {
  @ViewChild(TimeCheckComponent) hijo!: TimeCheckComponent;
  time: any;
  capital:any;
  interes:any;
  monto:any;
  tasainteres:any;
  onValorChange1(value: any) {
    this.capital = value;
  }
  onValorChange2(value: any) {
    if (value.includes('%')) {
      let [numero, porcentaje] = value.split('%');
      this.tasainteres = numero/100
    } else {
      this.tasainteres = value;
    }
    
  }
  onValorChange3(value: any) {
    this.interes = value;
  }
  onValorChange4(value: any) {
    this.monto = value;
  }

  ejecutarFuncionHijo() {
    this.hijo.timeCalculator();
    this.time = this.hijo.time;
  }
  intereSimpleCalculator(){
    if (this.capital > 0 && this.tasainteres > 0 && this.time > 0) {
      this.interes = this.capital * this.tasainteres * this.time
      this.monto = this.capital * (1 + (this.interes * this.time))
    } else {
      if (this.monto > 0 && this.capital > 0 && this.time > 0) {
        this.tasainteres = ((this.monto/this.capital)-1)/this.time
      } else {
        if (this.interes > 0 && this.capital > 0 && this.time > 0) {
          this.tasainteres = (this.interes/(this.capital*this.time))
        } else {
          if (this.tasainteres > 0 && this.interes > 0 && this.time > 0) {
            this.capital = (this.interes/(this.tasainteres * this.time))
          } else {
            if (this.tasainteres>0 && this.monto>0 && this.time >0 ) {
              this.capital = this.monto*(1+(this.tasainteres*this.time))
            } else {
              if (this.monto>0  && this.capital>0  && this.tasainteres>0 ) {
                this.time = ((this.monto/this.capital)-1)/this.tasainteres
              }
              else {
                if (this.interes>0  && this.capital>0  && this.tasainteres>0 ) {
                  this.time = this.interes/(this.capital*this.tasainteres)
                }
              }
            }
          }
        }
      }
    }
  }
}
