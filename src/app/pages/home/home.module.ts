import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { ButtonModule } from './../../shared/components/button/button.module';

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
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule { }
