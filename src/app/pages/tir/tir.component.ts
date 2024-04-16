import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tir',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tir.component.html',
  styleUrl: './tir.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TirComponent { }
