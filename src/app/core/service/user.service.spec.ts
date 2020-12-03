import {TokenService} from './token.service';
import {UserService} from './user.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {User} from '../model/user';
import {of} from 'rxjs';

describe('O serviço UserService', () => {

  let userService: UserService;
  const fakeUser: User = {
    id: 0,
    nome: '',
    nickname: '',
    tipoUsuarioId: 0,
    email: '',
    senha: '',
    acessoAprovado: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService
      ]
    });

    userService = TestBed.inject(UserService);
  });

  it('deve ser instânciado', () => {
    expect(userService).toBeTruthy();
  });

  it('chamar getUser', () => {
    const spy = spyOn(userService, 'getUser').and.returnValue(of(fakeUser));
    userService.getUser().subscribe(response => {
      expect(spy).toHaveBeenCalled();
      expect(response).toEqual(fakeUser);
    });
  });

  it('chamar getUserByEmail', () => {
    const spy = spyOn(userService, 'getUserByEmail').and.returnValue(of(fakeUser));
    userService.getUserByEmail('').subscribe(response => {
      expect(spy).toHaveBeenCalled();
      expect(response).toEqual(fakeUser);
    });
  });

});
