import {TestBed} from '@angular/core/testing';
import {AbstractService} from './abstract.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('O serviço AbstractService', () => {

  let service: AbstractService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AbstractService);
  });

  it('deve ser instânciado', () => {
    expect(service).toBeTruthy();
  });

});
