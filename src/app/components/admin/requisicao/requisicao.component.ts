import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { FuncionarioService } from './../../../services/funcionario.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DepartamentoService } from './../../../services/departamento.service';
import { RequisicaoService } from './../../../services/requisicao.service';
import { Funcionario } from 'src/app/models/funcionario.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Requisicao } from 'src/app/models/requisicao.model';
import { Departamento } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-requisicao',
  templateUrl: './requisicao.component.html',
  styleUrls: ['./requisicao.component.css']
})
export class RequisicaoComponent implements OnInit {

  requisicoes$: Observable<Requisicao[]>;
  departamentos$: Observable<Departamento[]>;
  edit: boolean;
  displayDialogRequisicao: boolean;
  form: FormGroup;
  funcionarioLogado: Funcionario;

  constructor(
    private requisicaoService: RequisicaoService,
    private departamentoService: DepartamentoService,
    private auth: AuthenticationService,
    private funcionarioService: FuncionarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.departamentos$ = this.departamentoService.list(),
    this.configForm(),
    this.recuperaFuncionario()
  }

  async recuperaFuncionario(){
    await this.auth.authUser().subscribe(dados=>{
      this.funcionarioService.getFuncionarioLogado(dados.email)
        .subscribe(funcionarios=> {
          this.funcionarioLogado = funcionarios[0];
          this.requisicoes$ = this.requisicaoService.list()
            .pipe(map((reqs: Requisicao[])=>reqs
              .filter(r=>r.solicitante.email === this.funcionarioLogado.email)))
        })
    });
  }

  configForm() {
    this.form = this.fb.group({
      id: new FormControl(),
      destino: new FormControl('', Validators.required),
      solicitante: new FormControl(''),
      dataAbertura: new FormControl(''),
      ultimaAtualizacao: new FormControl(''),
      status: new FormControl(''),
      descricao: new FormControl('', Validators.required),
      movimentacoes: new FormControl('')
    });
  }

  setValorPadrao(){
    this.form.patchValue({
      solicitante: this.funcionarioLogado,
      status: 'aberto',
      dataAbertura: new Date(),
      ultimaAtualizacao: new Date(),
      movimentacoes: []
    });
  }

  add(){
    this.form.reset();
    this.edit=false;
    this.displayDialogRequisicao=true;
    this.setValorPadrao();
  }

  selecionarRequisicao(req: Requisicao){
    this.edit = true;
    this.displayDialogRequisicao = true;
    this.form.setValue(req);
  }

  save() {
    this.requisicaoService.createOrUpdate(this.form.value)
      .then(()=>{
        this.displayDialogRequisicao = false;
        Swal.fire(
          `Requisição ${!this.edit?'salva':'atualizada'} com sucesso.`,
          '',
          'success'
        );
        this.displayDialogRequisicao = false;
      })
      .catch((erro)=>{
        this.displayDialogRequisicao = true;
        Swal.fire(
          `Erro ao ${!this.edit?'salvar':'atualizar'} a requisição.`,
          `Detalhes: ${erro}`,
          'error'
        );
      });
  }

  delete(req: Requisicao){
    Swal.fire({
      title: 'Confirma a exclusão da requisição?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    })
    .then((result)=>{
      if(result.value){
        this.requisicaoService.delete(req.id)
          .then(()=>{
            Swal.fire('Requisição excluída com sucesso!','','success');
          });
      }
    });
  }
}
