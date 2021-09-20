import Swal from 'sweetalert2';
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
  edit: boolean;
  displayDialogDepartamento: boolean;
  form: FormGroup;

  constructor( private departamentoService: DepartamentoService, private fb: FormBuilder ) {}

  configForm(){
    this.form = this.fb.group({
      id: new FormControl(),
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('')
    });
  }

  ngOnInit() {
    this.departamentos$ = this.departamentoService.list();
    this.configForm();
  }

  add() {
    this.form.reset();
    this.edit= false;
    this.displayDialogDepartamento = true;
  }

  selecionaDepartamento(depto: Departamento){
    this.edit = true;
    this.displayDialogDepartamento=true;
    this.form.setValue(depto);
  }

  save(){
    this.departamentoService.createOrUpdate(this.form.value)
      .then(()=>{
        this.displayDialogDepartamento=false;
        Swal.fire(
          `Departamento ${!this.edit?'Salvo':'Atualizado'} com sucesso`,
          '','success'
        );
      })
      .catch((erro)=>{
        this.displayDialogDepartamento=false;
        Swal.fire(
          `Erro ao ${!this.edit?'Salvo':'Atualizado'} o departamento.`,
          `Detalhes: ${erro}`, 'error'
        );
      });
    this.form.reset();
  }

  delete(depto: Departamento){
    Swal.fire({
      title: 'Confirma a exclusão do departamento?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    })
      .then((result)=>{
        if (result.value){
          this.departamentoService.delete(depto.id)
            .then(()=>{
              Swal.fire('Departamento excluído com sucesso!',
              '','success');
            })
        }
      })
  }
}
