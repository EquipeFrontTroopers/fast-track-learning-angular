import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSignUpComponent} from './form-sign-up/form-sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {SelectActionComponent} from './select-action/select-action.component';

@NgModule({
  declarations: [
    FormSignUpComponent,
    SelectActionComponent,
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ComponentsModule {
}
