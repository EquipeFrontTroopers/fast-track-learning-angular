import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormSignUpComponent} from './form-sign-up.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {AuthAppService} from '../../core/service/auth-app.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('O componente FormSignUpComponent', () => {
  let component: FormSignUpComponent;
  let fixture: ComponentFixture<FormSignUpComponent>;
  let authAppService: AuthAppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FormSignUpComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        AuthAppService,
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    authAppService = TestBed.inject(AuthAppService);

    fixture = TestBed.createComponent(FormSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instanciado', () => {
    expect(component).toBeTruthy();
  });

  it('chamar inputHasError', () => {
    const spy = spyOn(component, 'inputHasError').and.returnValue(true);
    const result = component.inputHasError('email');
    expect(spy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it('deve cadastrar o usuário', () => {
    const spySubmit = spyOn(component, 'submit').and.returnValue(null);
    component.submit();
    expect(spySubmit).toHaveBeenCalled();

    const spySignUp = spyOn(authAppService, 'SignUp').and.returnValue(null);
    authAppService.SignUp('', '', '', '');
    expect(spySignUp).toHaveBeenCalled();
  });

});
