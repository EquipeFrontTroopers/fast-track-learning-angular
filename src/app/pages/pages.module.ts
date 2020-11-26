import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home/home.component';
import { ButtonModule } from '../shared/components/button/button.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    RouterModule,
    ComponentsModule
  ],
})
export class PagesModule {
}
