import {TestBed} from '@angular/core/testing';
import {ListUserService} from './list-user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {User} from '../model/user';
import {TypeUser} from '../model/type-user';

describe('O serviço ListUserService', () => {

  let service: ListUserService;
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
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ListUserService);
  });

  it('deve ser instânciado', () => {
    expect(service).toBeTruthy();
  });

  it('deve chamar save ', () => {
    const spy = spyOn(service, 'save').and.returnValue(of(fakeUser));

    service.save(fakeUser).subscribe(response => {
      expect(response).toEqual(fakeUser);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar update', () => {
    const spy = spyOn(service, 'update').and.returnValue(of(fakeUser));

    service.update(fakeUser).subscribe(response => {
      expect(response).toEqual(fakeUser);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar getAllTypeUsers', () => {
    const fakeResp: TypeUser[] = [{
      id: 0,
      descricao: '',
      permissao: ''
    }];

    const spy = spyOn(service, 'getAllTypeUsers').and.returnValue(of(fakeResp));

    service.getAllTypeUsers().subscribe(response => {
      expect(response).toEqual(fakeResp);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar getAll', () => {
    const fakeResp: User[] = [fakeUser];
    const spy = spyOn(service, 'getAll').and.returnValue(of(fakeResp));

    service.getAll().subscribe(response => {
      expect(response).toEqual(fakeResp);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar getAllUsersFiltered', () => {
    const fakeResp: User[] = [fakeUser];
    const spy = spyOn(service, 'getAllUsersFiltered').and.returnValue(of(fakeResp));

    service.getAllUsersFiltered('').subscribe(response => {
      expect(response).toEqual(fakeResp);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar approve', () => {
    const spy = spyOn(service, 'approve').and.returnValue(of(fakeUser));

    service.approve(fakeUser).subscribe(response => {
      expect(response).toEqual(fakeUser);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar reject', () => {
    const spy = spyOn(service, 'reject').and.returnValue(of(fakeUser));

    service.reject(fakeUser).subscribe(response => {
      expect(response).toEqual(fakeUser);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar delete', () => {
    const spy = spyOn(service, 'delete').and.returnValue(of(fakeUser));

    service.delete(fakeUser).subscribe(response => {
      expect(response).toEqual(fakeUser);
      expect(spy).toHaveBeenCalled();
    });
  });

  it('deve chamar listUsersPaginatedAndFiltered', () => {
    const fakeResp: User[] = [fakeUser];
    const spy = spyOn(service, 'listUsersPaginatedAndFiltered').and.returnValue(of(fakeResp));

    service.listUsersPaginatedAndFiltered(0, '').subscribe(response => {
      expect(response).toEqual(fakeResp);
      expect(spy).toHaveBeenCalled();
    });
  });

});
