import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HomeComponent from './pages/home/home.component';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = "calculadora-ing-economica";
}
