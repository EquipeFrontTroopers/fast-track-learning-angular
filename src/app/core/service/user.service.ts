import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable({providedIn: 'root'})
export class UserService {
  public userSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as any;

    this.userSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

}
