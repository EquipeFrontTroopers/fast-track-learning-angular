import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {FormSignUpComponent} from './form-sign-up/form-sign-up.component';
import {SelectActionComponent} from './select-action/select-action.component';

@NgModule({
  declarations: [
    FormSignUpComponent,
    SelectActionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule {
}
