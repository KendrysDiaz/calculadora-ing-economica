import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { InputComponent } from '../../shared/input/input.component';
import { TimeCheckComponent } from '../../shared/time-check/time-check.component';
import * as uuid from 'uuid';


@Component({
  selector: 'app-tir',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    TimeCheckComponent
  ],

  templateUrl: './tir.component.html',
  styleUrl: './tir.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TirComponent {
  @ViewChild(TimeCheckComponent) hijo!: TimeCheckComponent;
  time: any;
  disbursement: any;
  collectionsAndPayments: any = [];
  cashFlows: any = [];
  collect: any;
  payment: any;
  tir: any;
  van: any;


  validateNan(value:any){
    return Number.isNaN(value)
  }

  onDisbursementChange(value: any) {
    this.disbursement = value;
  }

  onCollectChange(value: any, index: number) {

    this.collectionsAndPayments[index].collect = Number(value);

  }

  onPaymentChange(value: any, index: number) {
    this.collectionsAndPayments[index].payment = Number(value);


  }

  vaciarCampos() {
    this.disbursement = 0;
    this.collect = 0;
    this.payment = 0;
  }



  calcularValorNeto(rate: any, cashFlows: any) {
   
    return cashFlows.reduce((acc: any, cashFlow: any, index: any) => {
      return acc + cashFlow / Math.pow(1 + rate, index);
    }, 0);
  }

    findTIR(cashFlows: any, epsilon = 0.0001, maxIterations = 1000) {
      
      let lowerBound = -1; 
      let upperBound = 1;
      let iteration = 0;

      while (iteration < maxIterations) {
        let rate = (lowerBound + upperBound) / 2; 
        let npvValue = this.calcularValorNeto(rate, cashFlows); 

        if (Math.abs(npvValue) < epsilon) {
        
          return rate;
        } else if (npvValue > 0) {
      
          lowerBound = rate;
        } else {
        
          upperBound = rate;
        }

        iteration++;
      }

      throw new Error('No se pudo encontrar el TIR dentro de las iteraciones máximas.');
    }

  calculateClashFlow(collect: number, payment: number) {
    return collect - payment;
  }


  calculateCashFlowsPerPeriod() {
    this.cashFlows = this.collectionsAndPayments.map((value: any, index:any) => {

      return this.calculateClashFlow(value.collect, value.payment)
      
    })

    this.cashFlows.shift();

    this.cashFlows.unshift(Number(this.disbursement) * -1);

  }




  calcularTIR() {

    this.calculateCashFlowsPerPeriod();
    this.tir = Number(this.findTIR(this.cashFlows).toFixed(4)) * 100;
    this.van = this.calcularValorNeto(this.tir / 100, this.cashFlows).toFixed(2);
  }
  

  addYear() {
    this.collectionsAndPayments = [...this.collectionsAndPayments, {
      id: uuid.v4()
    }]
  }


}
