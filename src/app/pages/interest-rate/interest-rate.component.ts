import { Component } from '@angular/core';
import { RadioButtonComponent } from '../../shared/radio-button/radio-button.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from "../../shared/input/input.component";
import { InterestRatemessageComponent } from "../../shared/interest-ratemessage/interest-ratemessage.component";

@Component({
    selector: 'app-interest-rate',
    standalone: true,
    templateUrl: './interest-rate.component.html',
    styleUrl: './interest-rate.component.css',
    imports: [RadioButtonComponent, ReactiveFormsModule, InputComponent, InterestRatemessageComponent]
})


export default class InterestRateComponent {
  registrationForm: FormGroup;

  constructor() {
    this.registrationForm = new FormGroup({
      finalAmount: new FormControl(),
      capital: new FormControl(),
      Interest: new FormControl(),
      Time: new FormControl(),
    });
  }
}
