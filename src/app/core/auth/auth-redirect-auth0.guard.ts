import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthAppService} from "./auth-app.service";
import {TokenService} from "./token/token.service";


@Injectable({providedIn:'root'})
export class AuthRedirectAuth0Guard implements CanActivate{

  constructor(
    private router: Router,
    private auth: AuthAppService,
    private tokenService: TokenService
    ) {}

  canActivate(): boolean{
    if ( this.tokenService.hasToken() ){
      this.router.navigate(['selectAction'])
      return true
    }else{
      this.router.navigate(['sign-in'])
      return false
    }
  }
}
