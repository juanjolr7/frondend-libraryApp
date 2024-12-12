import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet,MatIconModule,MatButtonModule,MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router:Router,private authService:AuthService){}
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }
  logout() {
    this.authService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}
