import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Inyectamos el servicio AuthService para manejar la autenticación
  constructor(public auth: AuthService) {}

  // Método para manejar el inicio de sesión
  login(): void {
    this.auth.login();
  }

  // Método para manejar el cierre de sesión
  logout(): void {
    this.auth.logout();
  }
}

