import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
}
