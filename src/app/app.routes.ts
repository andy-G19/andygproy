import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetalleComponent } from './detalle/detalle.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    // { path: 'home', component: HomeComponent},
    { path: 'home',
        loadComponent: ()=> import('./home/home.component').then(m=>m.HomeComponent) //lazzy loading
    },
    //{ path: 'about', component: AboutComponent}, //carga el componente
    { path: 'about',
        loadComponent: ()=> import('./about/about.component').then(m=>m.AboutComponent) //lazzy loading
    },
    { path: 'cursos',
        loadComponent: ()=> import('./cursos/cursos.component').then(m=>m.CursosComponent) //lazzy loading
    },
    { 
        path: 'curso/:codigo', 
        component: DetalleComponent,
        canActivate: [authGuard]},
    { 
        path: 'curso-nuevo', 
        component: DetalleComponent,
        canActivate: [authGuard]},
    { 
        path: 'login',
        loadComponent: ()=> import('./login/login.component').then(m=>m.LoginComponent) //lazzy loading
    },
];

