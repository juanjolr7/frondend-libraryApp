import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{
  users:User[]=[];
  password: string = '';
  userMail:String = '';
  constructor(private userService:UsersService,private router:Router, private authService:AuthService){

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe( (data:User[]) =>{
      this.users = data;
      console.log(this.users);
    });
  }
  
  login() {
    const userM = this.userMail;
    const password = this.password;
    // Verificar si las credenciales coinciden con algún usuario en testUsers
    const user = this.users.find(
      user => user.email === userM && user.password === password
    );

    if (user) {
      this.authService.setCurrentUser(user);
      this.router.navigate(['/menu/home']);
    } else {
      alert('Usuario no encontrado');
    }
  }
}
