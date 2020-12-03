import {TokenService} from './token.service';
import {TestBed} from '@angular/core/testing';

describe('O serviço TokenService', () => {

  let service: TokenService;
  const token = 'tokenteste';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        TokenService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(TokenService);
  });

  it('deve ser instânciado', () => {
    expect(service).toBeTruthy();
  });

  it('deve guardar o Token', () => {
    service.setToken(token);
    expect(service.hasToken()).toBeTruthy();
    expect(service.getToken()).toBe(token);
  });

  it('deve limpar o local storage', () => {
    service.setToken(token);
    service.removeToken();
    expect(service.hasToken()).toBeFalsy();
    expect(service.getToken()).toBeFalsy();
  });

  afterEach(() => {
    localStorage.clear();
  });

});
