import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {FormSignUpComponent} from './components/form-sign-up/form-sign-up.component';
import {SelectActionComponent} from "./components/select-action/select-action.component";

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
    component: SelectActionComponent,
    data: {
      title: 'Selecionar Ação'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
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
