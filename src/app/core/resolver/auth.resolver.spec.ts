import {TestBed} from '@angular/core/testing';
import {AuthResolver} from './auth.resolver';

describe('O resolver AuthResolver', () => {

  let authResolver: AuthResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authResolver = TestBed.inject(AuthResolver);
  });

  it('Deve ser instânciado', () => {
    expect(authResolver).toBeTruthy();
  });

  it('Deve chamar resolve', () => {
    const spy = spyOn(authResolver, 'resolve').and.returnValue(true);
    const response = authResolver.resolve();
    expect(spy).toHaveBeenCalled();
    expect(response).toBeTruthy();
  });

});
