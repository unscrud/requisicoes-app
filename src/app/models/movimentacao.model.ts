import { Funcionario } from './funcionario.model';
import { Model } from "../core/model";

export class Movimentacao extends Model{
  funcionario: Funcionario;
  dataHora: any;
  status: string;
  descricao: string;
}
