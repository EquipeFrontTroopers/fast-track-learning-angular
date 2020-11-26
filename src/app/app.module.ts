import {ErrorsModule} from './errors/errors.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {PagesModule} from './pages/pages.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ErrorsModule,
    ComponentsModule,
    PagesModule,
    FontAwesomeModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
