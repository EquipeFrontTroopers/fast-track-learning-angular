import {Injectable} from '@angular/core';
import {AbstractService} from './abstract.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeUser} from '../model/type-user';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ListUserService extends AbstractService {

  private readonly urlBase = this.apiUrl + '';

  constructor(http: HttpClient) {
    super(http);
  }

  save(user: User): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/usuarios`, user);
  }

  update(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/usuarios/${user.id}`, user);
  }

  getTypeUsers(): Observable<TypeUser[]> {
    return this.http.get<TypeUser[]>(`${this.urlBase}/tipoUsuarios `);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlBase}/usuarios`);
  }

  approveUser(user: User): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/usuarios`, user);
  }

  rejectUser(user: User): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/usuarios/${user.id}`);
  }

}
