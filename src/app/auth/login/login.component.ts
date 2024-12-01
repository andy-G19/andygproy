import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule para ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],  // Importa FormsModule para el uso de ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/home']); // Redirigir a la página principal después del login
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  }
}