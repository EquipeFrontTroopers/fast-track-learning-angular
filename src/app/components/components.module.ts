import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSignUpComponent} from './form-sign-up/form-sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SelectActionComponent} from './select-action/select-action.component';
import {RouterModule} from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    FormSignUpComponent,
    HeaderComponent,
    SelectActionComponent,
    ListUsersComponent
  ],
  exports: [
    HeaderComponent,
    SelectActionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    SharedModule
  ]
})
export class ComponentsModule {
}
