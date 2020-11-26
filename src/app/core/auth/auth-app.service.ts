import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';
import {tap} from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserService} from '../user/user.service';
import {TokenService} from './token/token.service';



const API_URL = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class AuthAppService{

  private _auth0 = new auth0.WebAuth(
    {
    clientID: environment.auth0.idClient,
    domain: environment.auth0.domain,
    responseType: 'token',
    redirectUri: environment.auth0.redirect,
    audience: environment.auth0.audience,
    scope: environment.auth0.scope
    }
  );

  accessToken: string;
  userProfile: any;
  expiresAt: number;
  loggedIn: boolean = false;
  loggedIn$ = new BehaviorSubject<boolean>( this.loggedIn );
  loggingIn: boolean = false;
  private md5;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.md5 = new Md5();
    if ( JSON.parse( this.tokenService.getToken() ) > Date.now() ) {
      this.renewToken();
    }
  }

  private _getProfile( authResult ) {
    this.loggingIn = true;
    this._auth0.client.userInfo( authResult.accessToken, ( err, profile ) => {
      if ( profile ) {
        this._setSession( authResult, profile );
      } else if ( err ) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession( authResult, profile? ) {
    this.expiresAt = ( authResult.expiresIn * 1000 ) + Date.now();

    this.tokenService.setToken( JSON.stringify( this.expiresAt ) );
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.setLoggedIn( true );
    this.loggingIn = false;
  }

  setLoggedIn( value: boolean ) {
    this.loggedIn$.next( value );
    this.loggedIn = value;
  }

  login() {
    this._auth0.authorize();
  }

  logout() {
    this._clearExpiration();
    this._auth0.logout(
      {
      clientId: environment.auth0.idClient,
      returnTo: environment.auth0.redirect
      }
    );
  }

  handleAuth() {
    this._auth0.parseHash( ( err, authResult ) => {
      if ( authResult && authResult.accessToken ) {
        window.location.hash = '';
        this._getProfile( authResult );
      } else if ( err ) {
        this.router.navigate( [ '/sign-up' ] );
        console.error( `Erro: ${err.error}` );
        }
      }
    );
  }

  renewToken() {
    console.log('teste')

    this._auth0.checkSession( {}, ( err, authResult ) => {
      if ( authResult && authResult.accessToken ) {
        this._getProfile( authResult );
      } else {
        this._clearExpiration();
        }
      }
    );
  }

  private _clearExpiration() {
    this.tokenService.removeToken()
  }

  get tokenValid(): boolean {
    return Date.now() < JSON.parse( this.tokenService.getToken() );
  }

  authenticate( email: string, password: string ){
    const senha = this.md5.appendStr( password ).end();

    return this.http
      .get(API_URL + 'usuarios?' + 'email=' + email + `&senha=${senha}`,{observe: 'response'})
      .pipe(
        tap(
          res=>{
            //aqui fazer request para auth 0

            //  const authToken = res.headers.get('nome-do-token')
            // this.userService.setToken(authToken);
        }
      )
    ).subscribe(
      response=>{
          this.setLoggedIn(true);
        }
      )
  }
}
