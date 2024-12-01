import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [],
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']  
})
export class AccessComponent {

  constructor(private router: Router) {}

  // Método para redirigir a login, register o reset-password
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }
}