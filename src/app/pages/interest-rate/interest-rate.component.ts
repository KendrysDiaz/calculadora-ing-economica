import { InterestRateService } from './../../service/interest-rate.service';
import { Component, signal } from '@angular/core';
import { RadioButtonComponent } from '../../shared/radio-button/radio-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { InterestRatemessageComponent } from '../../shared/interest-ratemessage/interest-ratemessage.component';

@Component({
  selector: 'app-interest-rate',
  standalone: true,
  templateUrl: './interest-rate.component.html',
  styleUrl: './interest-rate.component.css',
  imports: [
    RadioButtonComponent,
    ReactiveFormsModule,
    InputComponent,
    InterestRatemessageComponent,
  ],
})
export default class InterestRateComponent {
  registrationForm: FormGroup;
  infofinalValue: number = 0;
  infopresentValue: number = 0;
  infoInteres: number = 0;
  infoTiempo: number = 0;
  infoTasa: string = '';

  public showContent = signal(false);

  constructor(private interesRateService: InterestRateService) {
    this.registrationForm = new FormGroup({
      finalValue: new FormControl(),
      presentValue: new FormControl(),
      interest: new FormControl(),
      Time: new FormControl(),
    });
  }

  showContentRate() {
    this.showContent.update((value) => !value);
  }

  calcular() {
    let result;
    result = this.interesRateService.calculatorInteresRate(
      this.registrationForm.value,
      this.showContent()
    );

    this.infofinalValue = result.finalValue;
    this.infopresentValue = result.presentValue;
    this.infoTasa = result.interesRate.toFixed(1);
    this.infoInteres = result.interest;
  }
}
