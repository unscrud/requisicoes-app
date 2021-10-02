import { Departamento } from './departamento.model';
import { Model } from "../core/model";
import { Funcionario } from "./funcionario.model";

export class Requisicao extends Model {
  solicitante: Funcionario;
  dataAbertura: any;
  ultimaAtualizacao:any;
  descricao: string;
  status: string;
  destino: Departamento;
  movimentacoes: Movimentacao[];
}

export class Movimentacao extends Model{
  funcionario: Funcionario;
  dataHora: any;
  status: string;
  descricao: string;
}
