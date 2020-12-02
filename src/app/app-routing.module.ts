import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {FormSignUpComponent} from './components/form-sign-up/form-sign-up.component';
import {FormSignInComponent} from './components/form-sign-in/form-sign-in.component';
import {SelectActionComponent} from './components/select-action/select-action.component';
import {AuthResolver} from './core/resolver/auth.resolver';
import {AuthRequiredGuard} from './core/auth/auth-required.guard';
import {UserResolver} from './core/resolver/user.resolver';
import {ListUsersComponent} from './components/list-users/list-users.component';

const routes: Routes = [

  {
    path: '',
    canActivate: [AuthRequiredGuard],
    children: [
      {path: '', redirectTo: 'select-action', pathMatch: 'full'},
      {path: 'select-action', component: SelectActionComponent, data: {title: 'Selecionar Ação'}, resolve: {user: UserResolver}},
      {path: 'list-users', component: ListUsersComponent, data: {title: 'Listar usuários'}},
    ]
  },

  {
    path: '',
    children: [
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {path: 'sign-up', component: FormSignUpComponent, data: {title: 'Cadastrar acesso'}},
      {path: 'sign-in', component: FormSignInComponent, data: {title: 'Login'}},
    ]
  },

  {path: '**', component: NotFoundComponent, data: {title: 'Page not-found'}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
