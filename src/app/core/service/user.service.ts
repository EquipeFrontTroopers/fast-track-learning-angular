import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';
import { User } from '../model/user';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class UserService {
  public userSubject = new BehaviorSubject<any>(null);
  private email: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    if ( tokenService.hasToken() ){
      this.decodeAndNotify();
    }
  }

  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as any;

    this.userSubject.next(user);
    this.email = user.email;
  }

  getUser(): Observable<any> {
    return this.http.get(API + '/usuarios?email=' + this.email);
  }

  getUserByEmail(email: string): Observable<User> {
    const params = new HttpParams()
      .append('email', email);
    return this.http.get<User>(API + '/usuarios', { params: params });
  }

}
