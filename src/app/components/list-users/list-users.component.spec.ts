import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListUsersComponent} from './list-users.component';
import {ListUserService} from '../../core/service/list-user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {TypeUser} from '../../core/model/type-user';
import {User} from '../../core/model/user';

describe('ListUsersComponent', () => {

  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  const fakeUser: User = {
    email: '',
    nickname: '',
    tipoUsuarioId: 0,
    nome: '',
    id: 0,
    senha: '',
    acessoAprovado: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListUsersComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        ListUserService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instânciado', () => {
    expect(component).toBeTruthy();
  });

  it('chamar getTypeUserById', () => {
    const fakeTypeUser: TypeUser = {
      id: 0,
      descricao: '',
      permissao: ''
    };

    const spy = spyOn(component, 'getTypeUserById').and.returnValue(fakeTypeUser);
    const resp = component.getTypeUserById(0);

    expect(spy).toHaveBeenCalled();
    expect(resp).toEqual(fakeTypeUser);
  });

  it('chamar approveUserAlert', () => {
    const spy = spyOn(component, 'approveUserAlert');
    component.approveUserAlert(fakeUser);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar removeUserAlert', () => {
    const spy = spyOn(component, 'removeUserAlert');
    component.removeUserAlert(fakeUser);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar approveUser', () => {
    const spy = spyOn(component, 'approveUser');
    component.approveUser(fakeUser);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar reproveUser', () => {
    const spy = spyOn(component, 'reproveUser');
    component.reproveUser(fakeUser);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar deleteUser', () => {
    const spy = spyOn(component, 'deleteUser');
    component.deleteUser(fakeUser);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar refreshList', () => {
    const spy = spyOn(component, 'refreshList');
    component.refreshList();
    expect(spy).toHaveBeenCalled();
  });

  it('chamar nextPage', () => {
    const spy = spyOn(component, 'nextPage');
    component.nextPage();
    expect(spy).toHaveBeenCalled();
  });

  it('chamar previousPage', () => {
    const spy = spyOn(component, 'previousPage');
    component.previousPage();
    expect(spy).toHaveBeenCalled();
  });

  it('chamar initializeListPagination', () => {
    const spy = spyOn(component, 'initializeListPagination');
    component.initializeListPagination();
    expect(spy).toHaveBeenCalled();
  });

  it('chamar initializeFilterPagination', () => {
    const spy = spyOn(component, 'initializeFilterPagination');
    component.initializeFilterPagination('');
    expect(spy).toHaveBeenCalled();
  });

  it('chamar initializePagination', () => {
    const spy = spyOn(component, 'initializePagination');
    component.initializePagination(1);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar filterUsers', () => {
    const spy = spyOn(component, 'filterUsers');
    component.filterUsers('');
    expect(spy).toHaveBeenCalled();
  });

  it('chamar getTypesAndUsers', () => {
    const spy = spyOn(component, 'getTypesAndUsers');
    component.getTypesAndUsers();
    expect(spy).toHaveBeenCalled();
  });

  it('chamar addUserAlert', () => {
    const spy = spyOn(component, 'addUserAlert');
    component.addUserAlert();
    expect(spy).toHaveBeenCalled();
  });

  it('chamar editUserAlert', () => {
    const spy = spyOn(component, 'editUserAlert');
    component.editUserAlert(fakeUser);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar userIsValid', () => {
    const spy = spyOn(component, 'userIsValid').and.returnValue(true);
    const response = component.userIsValid(fakeUser);
    expect(spy).toHaveBeenCalled();
    expect(response).toBeTruthy();
  });

  it('chamar getHtmlFormNewUser', () => {
    const spy = spyOn(component, 'getHtmlFormNewUser').and.returnValue('form');
    const response = component.getHtmlFormNewUser(fakeUser);
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual('form');
  });

  it('chamar getFormUser', () => {
    const spy = spyOn(component, 'getFormUser').and.returnValue(fakeUser);
    const user: User = component.getFormUser();
    expect(spy).toHaveBeenCalled();
    expect(user).toEqual(fakeUser);
  });

  it('chamar getTotalPages', () => {
    const spy = spyOn(component, 'getTotalPages');
    component.getTotalPages(1);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar hasMorePages', () => {
    const spy = spyOn(component, 'hasMorePages');
    component.hasMorePages(1);
    expect(spy).toHaveBeenCalled();
  });

  it('chamar hasLessPages', () => {
    const spy = spyOn(component, 'hasLessPages');
    component.hasLessPages(1);
    expect(spy).toHaveBeenCalled();
  });

});
