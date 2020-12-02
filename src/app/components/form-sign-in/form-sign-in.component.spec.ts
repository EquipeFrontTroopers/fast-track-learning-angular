import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {FormSignInComponent} from './form-sign-in.component';
import {AuthAppService} from '../../core/service/auth-app.service';
import {TokenService} from '../../core/service/token.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormSignUpComponent} from '../form-sign-up/form-sign-up.component';

describe('FormSignIn', () => {
  let component: FormSignInComponent;
  let fixture: ComponentFixture<FormSignInComponent>;
  let service: AuthAppService;
  let token: TokenService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        FormSignInComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AuthAppService,
        TokenService,
        FormBuilder
      ]
    });
  });
  beforeEach(() => {
    service = TestBed.inject( AuthAppService );
    token = TestBed.inject( TokenService );
    fixture = TestBed.createComponent(FormSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('Deve ser criado', (() => {
    expect(FormSignInComponent).toBeTruthy();
  }));

  it('Usuário autenticado',  () => {
    service.login('teste@teste.com.br', 'admin12345')
      .catch( success => {
        expect(token.hasToken()).toBeTrue();
      });
  });

  it('Usuário não autenticado', () => {
    service.login('', '')
      .then()
      .catch( error => {
      expect(token.hasToken()).toBeFalse();
    });
  });
  it('Usuário autenticado', () => {
    service.login('patrickluan.matos@gmail.com', 'admin12345')
      .then(success => {
        expect(token.hasToken()).toBeTrue();
      })
      .catch();
  });
  it('Error Input', () => {
    const spySubmit = spyOn(component, 'login').and.returnValue(null);
    component.login();
    expect(spySubmit).toHaveBeenCalled();
    const signIn = spyOn(service, 'login').and.returnValue(null);
    service.login(null, null);
    expect(signIn).toHaveBeenCalled();
  });
});
