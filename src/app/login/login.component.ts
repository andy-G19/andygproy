import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Inyectamos AuthService
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  ngOnInit(){
    
  }

  login() {
    this.authService.login(this.username, this.password)
      .then(() => {
        this.router.navigate(['/cursos']);  // Redirigir a la página protegida (ej. /dashboard)
      })
      .catch((error) => {
        this.errorMessage = `Error al iniciar sesión: ${error.message}`;
      });
  }

  loginConGoogle(){
    this.authService.loginConGoogle().then(()=>{
      this.router.navigate(['/cursos']);
    });
  }

  logout(){
    this.authService.logout();
    console.log(this.authService.logueado());
  }

  logueado(){
    return this.authService.logueado();
  }

  usuario(){
    const {email, displayName} = this.authService.usuario ?? {};
    return {email, displayName};
  }
}
