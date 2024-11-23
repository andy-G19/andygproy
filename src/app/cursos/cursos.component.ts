import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { Curso } from '../interfaces/curso';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})

export class CursosComponent {
  cursos?:Curso[];  //cursos:Curso[] = []

  constructor(
    private cursosService:CursosService,
    private router: Router){
  }

  async ngOnInit(){
    this.cursos = await this.cursosService.getCursos(); 
  }

  nuevoCurso(){
    this.router.navigate(['/curso-nuevo']);
  }

  async eliminarCurso(codigo:string){
    this.cursosService.eraseCursoPorCodigo(codigo);
    this.cursos = await this.cursosService.getCursos();
  }

  editarCurso(codigo:string){
    this.router.navigate(['/curso', codigo]);  }
}
