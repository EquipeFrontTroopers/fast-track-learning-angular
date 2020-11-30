import {ErrorsModule} from './errors/errors.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {AuthAppService} from './core/auth/auth-app.service';
import { FormsModule } from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp (environment.firebase),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ErrorsModule,
    ComponentsModule
  ],
  providers: [
    AuthAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
