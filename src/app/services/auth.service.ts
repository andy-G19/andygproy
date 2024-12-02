import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';  // Importamos Firestore
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
  GoogleAuthProvider, signInWithPopup,
  getAuth, setPersistence, browserLocalPersistence,
  User
  } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autenticado:boolean = false;
  usuario:User | undefined = undefined;

  constructor(
    private firestore:Firestore,
    private router:Router,
    private auth:Auth,
  ) {
    setPersistence(auth, browserLocalPersistence); //establece de que forma persistirán la sesión
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.usuario = user;
        this.autenticado = true;
      } else {
        this.usuario = undefined;
        this.autenticado = false;
      }
    });

  }

  // Registro de usuario
  register(username: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, username, password)
      .then((userCredential) => {
        // Guardar el usuario en Firestore
        const userRef = doc(collection(this.firestore, 'users'), userCredential.user?.uid);
        return setDoc(userRef, {
          username: username,
          uid: userCredential.user?.uid
        });
      });
  }

  loginConGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      if (token) {
        this.setUser(result.user);
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;
      console.error(errorCode, errorMessage, email);
    });
  }

  // Login de usuario
  login(username: string, password: string) {
    return signInWithEmailAndPassword(this.auth, username, password).then((result)=>{
      this.setUser(result.user);
      this.autenticado = true;
    });
  }

  // Logout
  logout() {
    return signOut(this.auth).then(() => {
      this.usuario = undefined;
      this.autenticado = false;
      this.router.navigate(['/login']);
    });
  }

  logueado():boolean{
    return this.autenticado;
  }

  getUser(){
    return this.usuario;
  }

  setUser(user:User){
    this.usuario = user;
  }

  getNombreUsuario(): string | null {
    return this.usuario?.displayName || null;
  }
}