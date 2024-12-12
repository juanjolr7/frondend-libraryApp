import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: User | null = null;
  constructor(private authService: AuthService){
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }
}
