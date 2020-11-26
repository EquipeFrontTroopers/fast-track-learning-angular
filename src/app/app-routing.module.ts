import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { FormSignUpComponent } from './components/form-sign-up/form-sign-up.component';
import { FormSignInComponent } from "./components/form-sign-in/form-sign-in.component";

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
    path: 'sign-in',
    component: FormSignInComponent,
    data: {
      title: 'Login'
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
    component: NotFoundComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
