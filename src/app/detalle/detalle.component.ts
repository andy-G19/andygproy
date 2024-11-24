import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { Curso } from '../interfaces/curso';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  curso: Curso | undefined;

  esEdicion: boolean = false;
  
  form: FormGroup;

  constructor(
    public route:ActivatedRoute,
    public cursosService: CursosService,
    private fb: FormBuilder,
    private router: Router,
  ){
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }

  async ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const codigo = params.get('codigo');
      console.log('CODIGO', codigo);

      if(codigo){
        this.esEdicion = true;
        console.log('okok')
        this.cursosService.getCursoPorCodigo(codigo).then(curso=>{
          if (curso) {
            this.form.setValue(curso);
          }
        });
    }});
  }

  guardar():void{
    const curso = this.form.value;
    if(this.esEdicion){
      this.cursosService.updateCurso(curso);
    }
    else{
      this.cursosService.createCurso(curso);
    }
    this.router.navigate(['/cursos'])
  }

  cancelar(): void{
    this.router.navigate(['/cursos']);
  }
}
