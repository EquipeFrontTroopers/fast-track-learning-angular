import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthAppService} from './auth-app.service';
import {TokenService} from './token/token.service';


@Injectable({providedIn: 'root'})
export class AuthRequiredGuard implements CanActivate{

  constructor(
    private router: Router,
    private auth: AuthAppService,
    private tokenService: TokenService
    ) {}

  canActivate(): boolean{
    this.auth.authenticate();
    if ( !this.tokenService.hasToken() ){
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
