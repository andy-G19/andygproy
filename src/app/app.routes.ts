import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetalleComponent } from './detalle/detalle.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},  // Redirige la raíz al componente 'home'
    
    // Ruta para 'home' (lazy loading)
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)  // Carga bajo demanda (Lazy Loading)
    },
    
    // Ruta para 'about' (lazy loading)
    {
        path: 'about',
        loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)  // Carga bajo demanda (Lazy Loading)
    },
    
    // Ruta para 'cursos' (lazy loading)
    {
        path: 'cursos',
        loadComponent: () => import('./cursos/cursos.component').then(m => m.CursosComponent)  // Carga bajo demanda (Lazy Loading)
    },
    
    // Ruta para 'curso/:codigo' (requiere autenticación)
    {
        path: 'curso/:codigo',
        component: DetalleComponent,
        canActivate: [authGuard]  // Protección de ruta
    },
    
    // Ruta para 'curso-nuevo' (requiere autenticación)
    {
        path: 'curso-nuevo',
        component: DetalleComponent,
        canActivate: [authGuard]  // Protección de ruta
    },

    // rutas para el acceso a login, register, y reset password
    {
        path: 'access',
        loadComponent: () => import('./auth/access.component').then(m => m.AccessComponent)
      },
    
    // Rutas para 'auth' (carga diferida)
    {
        path: 'login',  // Ruta para el login
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)  // Carga bajo demanda (Lazy Loading)
    },
    {
        path: 'register',  // Ruta para el registro
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)  // Carga bajo demanda (Lazy Loading)
    },
    {
        path: 'reset-password',  // Ruta para el restablecimiento de contraseña
        loadComponent: () => import('./auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)  // Carga bajo demanda (Lazy Loading)
    },
];
