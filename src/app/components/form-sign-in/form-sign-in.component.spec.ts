import {inject, TestBed} from '@angular/core/testing';
import {FormSignInComponent} from './form-sign-in.component';
import {AuthAppService} from '../../core/service/auth-app.service';
import {TokenService} from '../../core/service/token.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('FormSignIn', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AuthAppService,
        TokenService
      ]
    });
  });

  it('Deve ser criado', (() => {
    expect(FormSignInComponent).toBeTruthy();
  }));

  it('Usuário autenticado', inject([AuthAppService, TokenService], (service: AuthAppService, token: TokenService) => {
    service.login('teste@teste.com.br', 'admin12345');
    expect(token.hasToken()).toBeFalse();
  }));

  it('Usuário não autenticado', inject([AuthAppService, TokenService], (service: AuthAppService, token: TokenService) => {
    service.login('teste@teste.com.br', 'admin12345')
      .then()
      .catch( error => {
      expect(token.hasToken()).toBeFalse();
    });
  }));
  it('Usuário autenticado', inject([AuthAppService, TokenService], (service: AuthAppService, token: TokenService) => {
    service.login('patrickluan.matos@gmail.com', 'admin12345')
      .then(success => {
        expect(token.hasToken()).toBeTrue();
      })
      .catch();
  }));
});
