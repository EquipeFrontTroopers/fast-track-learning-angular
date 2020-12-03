import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { FormSignUpComponent } from './components/form-sign-up/form-sign-up.component';
import { FormSignInComponent } from './components/form-sign-in/form-sign-in.component';
import { SelectActionComponent } from './components/select-action/select-action.component';
import { AuthRequiredGuard } from './core/auth/auth-required.guard';
import { ListUserResolver } from './components/list-users/list-users.resolver';
import { ListUsersComponent } from './components/list-users/list-users.component';
import {PermissionGuard} from './core/auth/permission.guard';

const routes: Routes = [

  {
    path: '',
    canActivate: [AuthRequiredGuard],
    children: [
      { path: '', redirectTo: 'select-action', pathMatch: 'full'},
      { path: 'select-action', component: SelectActionComponent, data: { title: 'Selecionar Ação' }  },
      {
        path: 'list-users',
        component: ListUsersComponent,
        canActivate: [PermissionGuard],
        resolve: {
          listUsers: ListUserResolver
        },
        data: { title: 'Listar usuários' }
      },
    ]
  },

  {
    path: '',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-up', component: FormSignUpComponent, data: { title: 'Cadastrar acesso' } },
      { path: 'sign-in', component: FormSignInComponent, data: { title: 'Login' } },
    ]
  },

  { path: '**', component: NotFoundComponent, data: { title: 'Page not-found' } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
