import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgModule } from '@angular/core';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';


@NgModule({
  declarations: [],
  imports: [
    ComumModule,
    MovimentacaoRoutingModule,
    NgSelectModule
  ]
})
export class MovimentacaoModule { }
