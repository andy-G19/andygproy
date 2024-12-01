import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],  // Asegúrate de importar FormsModule para ngModel
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    try {
      // Crear el usuario con el correo y la contraseña
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/home']);  // Redirige a la página principal
    } catch (error: any) {
      console.error('Error en el registro: ', error);

      // Verificar si el error tiene un código y mostrar un mensaje adecuado
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'Este correo ya está en uso.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'El correo electrónico no es válido.';
            break;
          case 'auth/weak-password':
            this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
            break;
          default:
            this.errorMessage = 'Hubo un error al registrar el usuario.';
        }
      } else {
        this.errorMessage = 'Hubo un error inesperado. Intenta de nuevo.';
      }
    }
  }
}