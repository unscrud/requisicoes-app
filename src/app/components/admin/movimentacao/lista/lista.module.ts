import { NgSelectModule } from '@ng-select/ng-select';
import { ComumModule } from 'src/app/modules/comum.module';
import { NgModule } from '@angular/core';
import { ListaRoutingModule } from './lista-routing.module';

@NgModule({
  declarations: [],
  imports: [
    ComumModule,
    ListaRoutingModule,
    NgSelectModule
  ]
})
export class ListaModule { }
