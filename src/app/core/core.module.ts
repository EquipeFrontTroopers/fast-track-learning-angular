import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
  ],
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule
    ],
  exports: [
  ],
  providers: []
})
export class CoreModule{}
