import { inject, Injectable } from '@angular/core';
import { Curso } from '../interfaces/curso';
import { collection, Firestore, getDocs, where, query, doc, getDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursos:Curso[];

  constructor(private firestore: Firestore) { 
  }

  async getCursos():Promise<Curso[]>{
    const cursosRef = collection(this.firestore, 'cursos');
    const snapshot = await getDocs(cursosRef);
    const cursos: Curso[] = snapshot.docs.map(doc => ({
      ...doc.data() as Curso,
    }));
    return cursos;
  }

  async getCursoPorCodigo(codigo:string):Promise<Curso|null>{
    const snapshot = collection(this.firestore, 'cursos');
    const q = query(snapshot, where("codigo", "==", codigo));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('Curso no encontrado');
      return null;
    }

    // Si se encuentra el curso, devuelve los datos del primer documento
    const cursoDoc = querySnapshot.docs[0];  // Supone que el código es único
    return cursoDoc.data() as Curso;  // Supone que el código es único
    return cursoDoc.data() as Curso;
  }

  async eraseCursoPorCodigo(codigo:string):Promise<void>{
    await deleteDoc(doc(this.firestore, 'cursos', codigo));
  }

  async updateCurso(curso:Partial<Curso>){
    const cursoRef = doc(this.firestore, 'cursos', curso.codigo);
    await updateDoc(cursoRef, curso);

  }

  async createCurso(cursonuevo:Curso):Promise<void>{
    const cursoRef = doc(this.firestore, 'cursos', cursonuevo.codigo);
    await setDoc(cursoRef, cursonuevo);
  }


}
