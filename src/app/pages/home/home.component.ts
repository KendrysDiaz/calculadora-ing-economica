import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
