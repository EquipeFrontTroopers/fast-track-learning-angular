import {FormSignUpComponent} from './form-sign-up.component';
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {UserService} from '../../core/service/user.service';
import {AuthInterceptor} from '../../core/auth/auth.interceptor';
import {AuthRequiredGuard} from '../../core/auth/auth-required.guard';
import {AuthAppService} from '../../core/service/auth-app.service';
import {TokenService} from '../../core/service/token.service';

describe('SignUp', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [
      UserService,
      AuthInterceptor,
      AuthRequiredGuard
    ]
  }));
  it('Deve ser instanciado', () => {
    expect(FormSignUpComponent).toBeTruthy();
  });
  it('Usuário cadastrado Sucesso', inject([AuthAppService, TokenService], (service: AuthAppService, token: TokenService) => {
    service.SignUp( 'email@teste.com.br', 'admin123', 'nickNameTest')
      .then( success => {
        expect(success).toBeTrue();
      });
  }));
  it('Usuário cadastrado Error', inject([AuthAppService, TokenService], (service: AuthAppService, token: TokenService) => {
    service.SignUp( '', '', '')
      .then()
      .catch( error => {
        expect(error).toBeTrue();
      });
  }));
});
