import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  //standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  // Método para iniciar sesión
  login() {
    this.auth.login(this.email, this.password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
  }

  // Método para cerrar sesión
  logout() {
    this.auth.logout()
      .then(() => {
        console.log('Sesión cerrada exitosamente');
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}

