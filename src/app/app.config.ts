import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Configuración para Zone.js
    provideRouter(routes), // Configuración de enrutamiento
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Inicialización de Firebase
    provideFirestore(() => getFirestore()), // Configuración de Firestore
    provideAuth(() => getAuth()), // Configuración de autenticación
  ],
};