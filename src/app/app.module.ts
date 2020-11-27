import {ErrorsModule} from './errors/errors.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {AuthAppService} from './core/auth/auth-app.service';
import {AuthModule} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.idClient
    }),
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
