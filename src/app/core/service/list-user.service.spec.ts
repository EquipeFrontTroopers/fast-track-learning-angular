import { TestBed } from '@angular/core/testing';

import { ListUserService } from './list-user.service';

describe('ListUserService', () => {
  let service: ListUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
