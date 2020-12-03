import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeUser } from '../model/type-user';
import { User } from '../model/user';

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

  getAllTypeUsers(): Observable<TypeUser[]> {
    return this.http.get<TypeUser[]>(`${this.urlBase}/tipoUsuarios `);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlBase}/usuarios`);
  }

  getAllUsersFiltered(filter: string): Observable<User[]> {
    const params = new HttpParams()
      .append('nome_like', filter);
    return this.http
      .get<User[]>(`${this.urlBase}/usuarios`, { params: params });
  }

  approve(user: User): Observable<any> {
    user.acessoAprovado = true;
    return this.http.put<any>(`${this.urlBase}/usuarios/${user.id}`, user);
  }

  delete(user: User): Observable<any> {
    return this.http.patch<any>(`${this.urlBase}/usuarios/${user.id}`, { acessoAprovado: false });
    // return this.http.delete<any>(`${this.urlBase}/usuarios/${user.id}`);
  }

  reject(user: User): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/usuarios/${user.id}`);
  }

  listUsersPaginatedAndFiltered(page: number, filter: string) {
    const params = new HttpParams()
      .append('_page', page.toString())
      .append('nome_like', filter);

    return this.http
      .get<User[]>(`${this.urlBase}/usuarios`, { params: params });
  }


}
