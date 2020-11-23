import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home.routing.module';
import {SignInComponent} from './signin/signin.component';
import {SignUpComponent} from './signup/signup.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule,
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule{}
