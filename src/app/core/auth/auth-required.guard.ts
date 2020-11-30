import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AuthAppService} from './auth-app.service';


@Injectable({providedIn: 'root'})
export class AuthRequiredGuard implements CanActivate{

  constructor(
    private router: Router,
    private auth: AuthAppService
    ) {}

  canActivate(): boolean{
    if ( !this.auth.isLogged() ){
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;
  }
}
