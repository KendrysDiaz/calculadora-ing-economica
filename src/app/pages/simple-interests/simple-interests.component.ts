import { Component, ViewChild } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { TimeCheckComponent } from '../../shared/time-check/time-check.component';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-simple-interests',
  standalone: true,
  imports: [InputComponent, TimeCheckComponent],
  templateUrl: './simple-interests.component.html'
})
export default class SimpleInterestsComponent {
  @ViewChild(TimeCheckComponent) hijo!: TimeCheckComponent;
  time: any;
  capital:any;
  interes:any;
  monto:any;
  tasainteres:any;
  r1 = 0;
  r2 = 0;
  calculado1: any;
  calculado2: any;
  onCapitalChange(value: any) {
    this.capital = value;
  }
  
  onInterestRateChange(value: any) {
    if (value.includes('%')) {
      const [numero, porcentaje] = value.split('%');
      this.tasainteres = numero / 100;
    } else {
      this.tasainteres = value;
    }
  }
  
  onInterestChange(value: any) {
    this.interes = value;
  }
  
  onAmountChange(value: any) {
    this.monto = value;
  }

  vaciarCampos() {
    this.capital = 0;
    this.monto = 0;
    this.interes = 0;
    this.tasainteres = 0;
    this.hijo.time = 0;
    this.hijo.page = 0;
}
  
  ejecutarFuncionHijo() {
    this.hijo.timeCalculator();
    this.time = this.hijo.time;
  }
  interesSimpleCalculator() {
    if (this.capital > 0 && this.time > 0) {
      if (this.tasainteres > 0) {
        this.calculateInterestAndAmount();
      } else if (this.monto > 0) {
        this.calculateInterestRateFromAmount();
      } else if (this.interes > 0) {
        this.calculateInterestRateFromInterest();
      }
    } else if (this.tasainteres > 0 && this.time > 0) {
      if (this.interes > 0) {
        this.calculateCapitalFromInterest();
      } else if (this.monto > 0) {
        this.calculateCapitalFromAmount();
      }
    } else if (this.capital > 0 && this.tasainteres > 0) {
      if (this.monto > 0) {
        this.calculateTimeFromAmount();
      } else if (this.interes > 0) {
        this.calculateTimeFromInterest();
      }
    }
    this.vaciarCampos();
  }
  setCalculadoValues(result1: any, result2: any, value1: any, value2: any) {
    this.r1 = result1;
    this.r2 = result2;
    this.calculado1 = value1;
    this.calculado2 = value2;
  }
  
  calculateInterestAndAmount() {
    this.interes = this.capital * this.tasainteres * this.time;
    this.monto = this.capital * (1 + (this.tasainteres * this.time));
    this.setCalculadoValues('Interes simple','Monto/VF', this.interes,this.monto);
  }
  
  calculateInterestRateFromAmount() {
    this.tasainteres = ((this.monto / this.capital) - 1) / this.time;
    this.setCalculadoValues('Tasa de interes',0,this.tasainteres,0);
  }
  
  calculateInterestRateFromInterest() {
    this.tasainteres = this.interes / (this.capital * this.time);
    this.setCalculadoValues('Tasa de interes',0,this.tasainteres,0);
  }
  
  calculateCapitalFromInterest() {
    this.capital = this.interes / (this.tasainteres * this.time);
    this.setCalculadoValues('Capital/VP',0,this.capital,0);
  }
  
  calculateCapitalFromAmount() {
    this.capital = this.monto / (1 + (this.tasainteres * this.time));
    this.setCalculadoValues('Capital/VP',0,this.capital,0);
  }
  
  calculateTimeFromAmount() {
    let tiempo = ((this.monto / this.capital) - 1) / this.tasainteres;
    let result;
    if (tiempo > 1) {
      let years = Math.floor(tiempo);
      let months = Math.round((tiempo - years) * 12);
      result = `${years} años y ${months} meses`
      this.time = 1;
    } else {
      result = `${tiempo * 12} meses`
    }
    this.setCalculadoValues('Tiempo',0,result,0);
  }
  
  calculateTimeFromInterest() {
    let tiempo = this.interes / (this.capital * this.tasainteres);
    let result;
    if (tiempo > 1) {
      let years = Math.floor(tiempo);
      let months = Math.round((tiempo - years) * 12);
      result = `${years} años y ${months} meses`
      this.time = 1;
    } else {
      result = `${tiempo * 12} meses`
    }
    this.setCalculadoValues('Tiempo',0,result,0);
  }
}
