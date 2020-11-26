import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {FormSignUpComponent} from './components/form-sign-up/form-sign-up.component';
import {SelectActionComponent} from './components/select-action/select-action.component';
import {FormSignInComponent} from './components/form-sign-in/form-sign-in.component';
import {AuthResolver} from './core/auth/auth.resolver';
import {AuthRequiredGuard} from './core/auth/auth-required.guard';
import {AuthRedirectAuth0Guard} from './core/auth/auth-redirect-auth0.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
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
    path: 'selectAction',
    pathMatch: 'full',
    component: SelectActionComponent,
    canActivate: [AuthRequiredGuard],
    data: {
      title: 'Selecionar Ação'
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
    canActivate: [AuthRedirectAuth0Guard],
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
    redirectTo: 'not-found',

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
