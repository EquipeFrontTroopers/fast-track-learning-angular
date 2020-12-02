import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthAppService} from '../../core/service/auth-app.service';
import {UserService} from '../../core/service/user.service';
import {of} from 'rxjs';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('O componente HeaderComponent', () => {

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: UserService;
  let authAppService: AuthAppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        AuthAppService,
        UserService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    authAppService = TestBed.inject(AuthAppService);

    spyOn(userService, 'getUser')
      .and
      .returnValue(
        of([{
          id: 1,
          name: 'Teste',
          email: 'teste@compasso.com.br'
        }])
      );

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instânciado', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar isLogged', () => {
    spyOn(component, 'isLogged');
    component.isLogged();
    expect(component.isLogged).toHaveBeenCalled();
  });

  it('deve chamar logoutConfirm', () => {
    const spy = spyOn(authAppService, 'isLogged').and.returnValue(true);
    authAppService.isLogged();
    expect(spy).toHaveBeenCalledWith();

    spyOn(component, 'logoutConfirm');
    component.logoutConfirm();
    expect(component.logoutConfirm).toHaveBeenCalled();
  });

  it('deve fazer logout', () => {
    const spy = spyOn(authAppService, 'logout').and.returnValue(null);
    component.logout();
    expect(spy).toHaveBeenCalledWith();
  });

});
