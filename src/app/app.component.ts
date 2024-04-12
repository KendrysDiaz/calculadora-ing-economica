import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import HomeComponent from "./pages/home/home.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = "calculadora-ing-economica";
}
