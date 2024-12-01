import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],  // Asegúrate de agregar FormsModule aquí
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);  // Enviar el email para resetear la contraseña
      this.successMessage = 'Se ha enviado un correo para restablecer tu contraseña.';
    } catch (error) {
      console.error('Error en el restablecimiento de la contraseña: ', error);
      this.errorMessage = 'Hubo un error al enviar el correo. Intenta de nuevo.';
    }
  }
}