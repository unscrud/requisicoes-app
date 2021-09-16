import { DepartamentoModule } from './components/admin/departamento/departamento.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {
    path: 'admin/painel',
    loadChildren: ()=> import('./components/admin/painel/painel.module')
      .then(m=>m.PainelModule),
    canActivate: [AuthguardService]
  },
  {
    path: 'admin/departamento',
    loadChildren:()=>import('./components/admin/departamento/departamento.module')
      .then(m => m.DepartamentoModule),
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
