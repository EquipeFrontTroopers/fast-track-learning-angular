import {TokenService} from './token.service';
import {TestBed} from '@angular/core/testing';

describe('O serviço TokenService', () => {

  let service: TokenService;
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6Ijk1MjJiZjgwLTQ4NjktNGM5Yy05MmIxLTQwNTg1ZDkzNTUyNCIsImlhdCI6MTYwNjkzODQ4MiwiZXhwIjoxNjA2OTQyMDgyfQ.ax-lMb-SwZwudk4_OGgDhnNafUTNFPY8wc8QPeowZRI';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        TokenService
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    service = TestBed.inject(TokenService);
  });
  it('Deve ser instanciado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve guardar o Token', () => {
    expect(service).toBeTruthy();
    service.setToken(token);
    expect(service.hasToken()).toBeTruthy();
    expect(service.getToken()).toBe('valorDoToken');
  });

  it('Deve limpar o local storage', () => {
    service.setToken(token);
    service.removeToken();
    expect(service.hasToken()).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  });

  afterEach(() => {
    localStorage.clear();
  });

});
