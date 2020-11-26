import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from '../user/user.service';
import {TokenService} from './token/token.service';
import {AuthService} from '@auth0/auth0-angular';

@Injectable({providedIn: 'root'})
export class AuthAppService{
  private userSubject = new BehaviorSubject<any>(null);

  logged: boolean = false;
  private md5;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private auth0: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.md5 = new Md5();
  }


  isLogged(): boolean{
    return this.tokenService.hasToken()
  }

  authenticate(){

    this.auth0.idTokenClaims$.subscribe(token => this.tokenService.setToken(token.__raw) )
    this.auth0.user$.subscribe(
      user => {
        this.userSubject.next( user )
      },
      error => {
        this.tokenService.removeToken()
        this.router.navigate([''])
      }
    )
  }
}
