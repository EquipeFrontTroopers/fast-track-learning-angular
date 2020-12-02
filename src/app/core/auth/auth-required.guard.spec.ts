import {inject, TestBed} from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import {AuthRequiredGuard} from './auth-required.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../service/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';

describe('AuthRequiredGuard', () => {

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

  it('Deve ser criado', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
  it('Validação authGuard', inject([AuthRequiredGuard],(service: AuthRequiredGuard)=>{
    expect(service.canActivate()).toBeFalse();
  }));

});
