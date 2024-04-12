import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "app-input",
  standalone: true,
  imports: [],
  templateUrl: "./input.component.html",
  styleUrls: ["../styles/input.style.css"],
})
export class InputComponent {
  @Input() title!: string;
  @Input() info!: string;
  @Input() type!: string;
  @Input() init!: string;

  valor: any;

  @Output() valorChange = new EventEmitter<any>();

  onValorChange() {
    this.valorChange.emit(this.valor);
  }

  clear() {
    this.valorChange.emit(this.valor);
  }
}
