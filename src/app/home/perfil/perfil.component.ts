import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  @Input() nombre!:string;
  @Input() email!:string;
  @Input() edad!:number;

  @Output() onEdit = new EventEmitter<any>();

  editarPerfil(){
    this.onEdit.emit("yo soy el perfil");
  }
}
