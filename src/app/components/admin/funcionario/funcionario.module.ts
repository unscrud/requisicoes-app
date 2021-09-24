import { FilterDepartamentoPipe } from './../../../pipes/filter-departamento.pipe';
import { NgModule } from '@angular/core';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    FuncionarioComponent,
    FilterDepartamentoPipe
  ],
  imports: [
    ComumModule,
    FuncionarioRoutingModule,
    NgSelectModule
  ]
})
export class FuncionarioModule { }
