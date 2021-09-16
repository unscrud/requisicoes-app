import { DepartamentoService } from './../../../services/departamento.service';
import { Departamento } from './../../../models/departamento.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos$: Observable<Departamento[]>;
  edit: boolean = false;
  displayDialogDepartamento: boolean = false;
  form: FormGroup;

  constructor( private departamentoService: DepartamentoService, private fb: FormBuilder ) {
   }

  configForm(){
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

}
