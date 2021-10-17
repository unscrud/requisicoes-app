import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { RequisicaoService } from './../../../services/requisicao.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/funcionario.model';
import { Component, Input, OnInit } from '@angular/core';
import { Requisicao, Movimentacao } from 'src/app/models/requisicao.model';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.css']
})
export class MovimentacaoComponent implements OnInit {

  @Input() funcionarioLogado: Funcionario;
  requisicoes$: Observable<Requisicao[]> | any;//e aqui
  movimentacoes: Movimentacao[];
  requisicaoSelecionada: Requisicao;
  edit: boolean;
  displayDialogMovimentacao:boolean;
  displayDialogMovimentacoes: boolean;
  form: FormGroup;
  listaStatus: String[];

  constructor(
    private requisicaoService: RequisicaoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.carregaStatus();
    this.listaRequisicoesDepartamento();//e aqui
  }

  listaRequisicoesDepartamento() {// o problema está aqui
    this.requisicoes$ = this.requisicaoService.list().pipe(
      map( (reqs: Requisicao[]) => reqs.filter(
        r => r.destino.nome === this.funcionarioLogado.departamento.nome)));
  }

  configForm() {
    this.form = this.fb.group({
      funcionario: new FormControl('', Validators.required),
      dataHora: new FormControl(''),
      status: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  carregaStatus() {
    this.listaStatus = ['Aberto', 'Pendente', 'Processando', 'Não autorizada', 'Finalizado'];
  }

  setValorPadrao() {
    this.form.patchValue({
      funcionario: this.funcionarioLogado,
      dataHora: new Date()
    });
    this.movimentacoes = [];
  }

  add(requisicao: Requisicao) {
    this.form.reset();
    this.edit=false;
    this.setValorPadrao();
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = (!requisicao.movimentacoes?[]:requisicao.movimentacoes);
    this.displayDialogMovimentacao = true;
  }

  verMovimentacoes(requisicao: Requisicao){
    this.requisicaoSelecionada = requisicao;
    this.movimentacoes = requisicao.movimentacoes;
    this.displayDialogMovimentacoes = true;
  }

  onDialogClose(event){
    this.displayDialogMovimentacoes = event;
  }

  save(){
    this.movimentacoes.push(this.form.value);
    this.requisicaoSelecionada.movimentacoes = this.movimentacoes;
    this.requisicaoSelecionada.status = this.form.controls['status'].value;
    this.requisicaoSelecionada.ultimaAtualizacao = new Date();
    this.requisicaoService.createOrUpdate(this.requisicaoSelecionada)
      .then(()=>{
        this.displayDialogMovimentacao = false;
        Swal.fire(
          `Requisição ${!this.edit?'salva':'atualizada'} com sucesso.`,
          '',
          'success'
        );
      })
      .catch((erro)=>{
        this.displayDialogMovimentacao = true;
        Swal.fire(
          `Erro ao ${!this.edit?'salvar':'atualizar'} a requisição.`,
          `Detalhes ${erro}`,
          'error'
        );
      });
    this.form.reset();
  }

  delete(depto: Requisicao){
    Swal.fire({
      title: 'Confirma a exclusão da Requisição?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result)=>{
      this.requisicaoService.delete(depto.id).then(()=>{
        Swal.fire('Requisição excluída com sucesso.','','success');
      })
    });
  }
}
