import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Inyectamos AuthService
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  private authService = inject(AuthService);  // Inyectamos AuthService
  private router = inject(Router);            // Inyectamos Router

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(this.username, this.password)
      .then(() => {
        this.router.navigate(['/login']);  // Redirigir al login después de registrarse
      })
      .catch((error) => {
        this.errorMessage = `Error al registrar el usuario: ${error.message}`;
      });
  }
}