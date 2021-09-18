import { NgModule } from '@angular/core';
import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { ComumModule } from '../../../modules/comum.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [
    DepartamentoComponent
  ],
  imports: [
    ComumModule,
    ReactiveFormsModule,
    DepartamentoRoutingModule,
    DialogModule
  ]
})
export class DepartamentoModule {}
