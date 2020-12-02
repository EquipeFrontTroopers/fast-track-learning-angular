import {TestBed} from '@angular/core/testing';
import {UserResolver} from './user.resolver';
import {UserService} from '../service/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {User} from '../model/user';

describe('O resolver UserResolver', () => {

  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        UserService
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    userResolver = TestBed.inject(UserResolver);
    userService = TestBed.inject(UserService);
  });

  it('Deve ser instânciado', () => {
    expect(userResolver).toBeTruthy();
  });

  it('Deve chamar resolve', () => {
    const fakeUser: User = {
      id: 1,
      nome: 'Teste',
      email: 'teste@compasso.com.br',
      acessoAprovado: false,
      senha: '',
      tipoUsuarioId: 0,
      nickname: 'Teste'
    };
    const spy = spyOn(userResolver, 'resolve').and.returnValue(fakeUser);
    const response = userResolver.resolve();
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(fakeUser);
  });

});
