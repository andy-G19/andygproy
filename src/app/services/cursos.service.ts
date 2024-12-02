import { Injectable } from '@angular/core';
import { Curso } from '../interfaces/curso';
import { collection, Firestore, getDocs, where, query, doc, getDoc, deleteDoc, updateDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(private firestore: Firestore) { }

  // Obtener todos los cursos
  async getCursos(): Promise<Curso[]> {
    const cursosRef = collection(this.firestore, 'cursos');
    const snapshot = await getDocs(cursosRef);
    return snapshot.docs.map(doc => doc.data() as Curso);
  }

  // Obtener un curso por su código
  async getCursoPorCodigo(codigo: string): Promise<Curso | null> {
    const cursosRef = collection(this.firestore, 'cursos');
    const q = query(cursosRef, where("codigo", "==", codigo));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.error('Curso no encontrado');
      return null;
    }
    const cursoDoc = querySnapshot.docs[0];
    return cursoDoc.data() as Curso;
  }

  // Eliminar un curso por su código
  async eraseCursoPorCodigo(codigo: string): Promise<void> {
    const cursoRef = doc(this.firestore, 'cursos', codigo);
    const cursoSnap = await getDoc(cursoRef);
    if (cursoSnap.exists()) {
      await deleteDoc(cursoRef);
    } else {
      console.error('Curso no encontrado para eliminar');
    }
  }

  // Actualizar un curso
  async updateCurso(curso: Partial<Curso>): Promise<void> {
    if (!curso.codigo) {
      throw new Error("El curso debe tener un código para actualizar.");
    }
    const cursoRef = doc(this.firestore, 'cursos', curso.codigo);
    await updateDoc(cursoRef, curso);
  }

  // Crear un nuevo curso
  async createCurso(cursoNuevo: Curso): Promise<void> {
    const cursoRef = doc(this.firestore, 'cursos', cursoNuevo.codigo);
    await setDoc(cursoRef, cursoNuevo);
  }
}