import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeGradComponent } from '../../shared/time-grad/timeGrad.component';

@Component({
  selector: 'app-gradient',
  standalone: true,
  imports: [ReactiveFormsModule, TimeGradComponent],
  templateUrl: './gradient.component.html',
  styleUrl: './gradient.component.css'
})
export default class GradientComponent {

}
