import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {FormSignUpComponent} from './components/form-sign-up/form-sign-up.component';
import {FormSignInComponent} from './components/form-sign-in/form-sign-in.component';
import {SelectActionComponent} from './components/select-action/select-action.component';
import {AuthResolver} from './core/auth/auth.resolver';
import {AuthRequiredGuard} from './core/auth/auth-required.guard';
import {UserResolver} from './core/user/user.resolver';
import {ListUsersComponent} from './components/list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
    data: {
      title: ''
    }
  },
  {
    path: 'sign-up',
    component: FormSignUpComponent,
    data: {
      title: 'Cadastrar acesso'
    }
  },
  {
    path: 'select-action',
    component: SelectActionComponent,
    data: {
      title: 'Selecionar Ação'
    },
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    data: {
      title: 'Listar usuários'
    },
  },
  {
    path: 'sign-in',
    component: FormSignInComponent,
    resolve: {
      auth: AuthResolver
    },
    data: {
      title: 'Login'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthRequiredGuard],
    resolve: {
      user: UserResolver
    },
    data: {
      title: 'Home'
    }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Page not-found'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
