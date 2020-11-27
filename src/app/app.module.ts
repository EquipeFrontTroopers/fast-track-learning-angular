import {ErrorsModule} from './errors/errors.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {PagesModule} from './pages/pages.module';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.idClient,
      redirectUri: environment.auth0.redirect,
    }),
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ErrorsModule,
    ComponentsModule,
    PagesModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
