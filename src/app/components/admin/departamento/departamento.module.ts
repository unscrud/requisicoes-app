import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { DepartamentoComponent } from './departamento.component';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DepartamentoComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    DepartamentoRoutingModule
  ]
})
export class DepartamentoModule {}
