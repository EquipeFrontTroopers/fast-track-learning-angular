import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';

@Injectable({providedIn: 'root'})

export class AuthResolver implements Resolve<any>{

  constructor(
    private authZero: AuthService
  ) {}

  resolve(): any{
    return this.authZero.loginWithRedirect();
  }


}
