import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { TeamworkComponent } from '../../shared/teamwork/teamwork.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, TeamworkComponent ,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {}
