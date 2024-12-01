import { Component } from '@angular/core';
import { PerfilComponent } from './perfil/perfil.component';
import { NgFor, NgIf } from '@angular/common';
import { CursosService } from '../services/cursos.service';
import { Curso } from '../interfaces/curso';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PerfilComponent, NgFor, NgIf], //IMPORTANTE
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nombre: string = 'ANDY G';


  constructor(
    public cursosService:CursosService,
    //inyectar el servicio hobbies
  ){
  }
  ngOnInit(){
    //cargar los hobbies
  }

  hobbies = [];

  hicisteClick(){
    this.nombre = 'CARLOS';
    console.log("Hiciste click");
  }

  manejarEdit(e: any){
    console.log("Emitido", e);
  }


}
