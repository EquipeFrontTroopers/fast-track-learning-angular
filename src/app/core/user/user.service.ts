import {Injectable} from '@angular/core';
import {User} from './user';
import {BehaviorSubject, Observable} from 'rxjs';
import jwt_decode from "jwt-decode";
import {HttpClient} from '@angular/common/http';
import {TokenService} from "../auth/token/token.service";


@Injectable({providedIn: 'root'})
export class UserService{

  private userSubject = new BehaviorSubject<User>(null);
  private user = new BehaviorSubject<User>(null);
  private email: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  setToken(token:string){
    this.tokenService.setToken(token)
    this.decodeAndNotify()
  }
  decodeAndNotify(){
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;

    this.email = user.email;

    this.userSubject.next(user);
  }
  setDataUser( data ){
    this.user.next(data);
  }
  getUser(): Observable<User>{
    return this.user.asObservable();
  }



}
