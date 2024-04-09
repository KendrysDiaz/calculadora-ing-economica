import { Component } from '@angular/core';
import { InterestRateConverterComponent } from "../../shared/interest-rate-converter/interest-rate-converter.component";

@Component({
    selector: 'app-annuities',
    standalone: true,
    templateUrl: './annuities.component.html',
    styleUrl: './annuities.component.css',
    imports: [InterestRateConverterComponent]
})
export default class AnnuitiesComponent {

}
