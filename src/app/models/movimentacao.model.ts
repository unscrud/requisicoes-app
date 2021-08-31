import { Funcionario } from './funcionario.model';
import { Model } from "../core/model";

export class Movimentacao extends Model{
  funcionario: Funcionario = new Funcionario();
  dataHora: Date = new Date();
  status: string = '';
  descricao: string = '';
}
