import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSignUpComponent} from './form-sign-up/form-sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    FormSignUpComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule {
}
