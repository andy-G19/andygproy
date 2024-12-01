import { Injectable } from '@angular/core';
import { Auth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  logueado(): boolean {
    return this.auth.currentUser !== null;
  }

  logout() {
    return signOut(this.auth);
  }
}
