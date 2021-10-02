import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgModule } from '@angular/core';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoComponent } from './movimentacao.component';


@NgModule({
  declarations: [
    MovimentacaoComponent
  ],
  imports: [
    ComumModule,
    MovimentacaoRoutingModule,
    NgSelectModule
  ]
})
export class MovimentacaoModule { }
